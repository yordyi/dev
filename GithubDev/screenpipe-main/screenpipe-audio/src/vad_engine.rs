use anyhow;
use log::debug;
use std::collections::VecDeque;
use std::io::Write;
use std::path::PathBuf;
use vad_rs::{Vad, VadStatus};

#[derive(Clone, Copy, Debug)]
pub enum VadSensitivity {
    Low,
    Medium,
    High,
}

impl VadSensitivity {
    pub fn min_speech_ratio(&self) -> f32 {
        match self {
            VadSensitivity::Low => 0.1,     // 10% of frames must be speech
            VadSensitivity::Medium => 0.05, // 5% of frames must be speech
            VadSensitivity::High => 0.02,   // 2% of frames must be speech
        }
    }
}

pub enum VadEngineEnum {
    WebRtc,
    Silero,
}

pub trait VadEngine: Send {
    fn is_voice_segment(&mut self, audio_chunk: &[f32]) -> anyhow::Result<bool>;
    fn set_sensitivity(&mut self, sensitivity: VadSensitivity);
    fn get_min_speech_ratio(&self) -> f32;
}

pub struct WebRtcVad {
    vad: webrtc_vad::Vad,
    sensitivity: VadSensitivity,
}

impl WebRtcVad {
    pub fn new() -> Self {
        let vad = webrtc_vad::Vad::new();
        Self {
            vad,
            sensitivity: VadSensitivity::High,
        }
    }
}

impl VadEngine for WebRtcVad {
    fn is_voice_segment(&mut self, audio_chunk: &[f32]) -> anyhow::Result<bool> {
        // Convert f32 to i16
        let i16_chunk: Vec<i16> = audio_chunk.iter().map(|&x| (x * 32767.0) as i16).collect();

        // Set VAD mode based on sensitivity
        let mode = match self.sensitivity {
            VadSensitivity::Low => webrtc_vad::VadMode::Quality,
            VadSensitivity::Medium => webrtc_vad::VadMode::Aggressive,
            VadSensitivity::High => webrtc_vad::VadMode::VeryAggressive,
        };
        self.vad.set_mode(mode);

        let result = self
            .vad
            .is_voice_segment(&i16_chunk)
            .map_err(|e| anyhow::anyhow!("WebRTC VAD error: {:?}", e))?;

        Ok(result)
    }

    fn set_sensitivity(&mut self, sensitivity: VadSensitivity) {
        self.sensitivity = sensitivity;
    }

    fn get_min_speech_ratio(&self) -> f32 {
        self.sensitivity.min_speech_ratio()
    }
}

const FRAME_HISTORY: usize = 10; // Number of frames to consider for decision
const SPEECH_THRESHOLD: f32 = 0.5;
const SILENCE_THRESHOLD: f32 = 0.35;
const SPEECH_FRAME_THRESHOLD: usize = 3; // Minimum number of frames above SPEECH_THRESHOLD to consider as speech

pub struct SileroVad {
    vad: Vad,
    prob_history: VecDeque<f32>,
    sensitivity: VadSensitivity,
}

impl SileroVad {
    pub async fn new() -> anyhow::Result<Self> {
        debug!("Initializing SileroVad...");
        let model_path = Self::download_model().await?;
        debug!("SileroVad Model downloaded to: {:?}", model_path);
        let vad = Vad::new(model_path, 16000).map_err(|e| {
            debug!("SileroVad Error creating Vad: {}", e);
            anyhow::anyhow!("Vad creation error: {}", e)
        })?;
        debug!("SileroVad initialized successfully");
        Ok(Self {
            vad,
            prob_history: VecDeque::with_capacity(FRAME_HISTORY),
            sensitivity: VadSensitivity::Medium,
        })
    }

    async fn download_model() -> anyhow::Result<PathBuf> {
        debug!("Downloading SileroVAD model...");
        let url =
            "https://github.com/k2-fsa/sherpa-onnx/releases/download/asr-models/silero_vad.onnx";
        let response = reqwest::get(url).await?;
        let model_data = response.bytes().await?;

        let path = std::env::temp_dir().join("silero_vad.onnx");
        let mut file = std::fs::File::create(&path)?;
        file.write_all(&model_data)?;
        debug!("SileroVad Model downloaded and saved to: {:?}", path);

        Ok(path)
    }

    fn update_status(&mut self, prob: f32) -> VadStatus {
        self.prob_history.push_back(prob);
        if self.prob_history.len() > FRAME_HISTORY {
            self.prob_history.pop_front();
        }

        let speech_frames = self
            .prob_history
            .iter()
            .filter(|&&p| p > SPEECH_THRESHOLD)
            .count();
        let silence_frames = self
            .prob_history
            .iter()
            .filter(|&&p| p < SILENCE_THRESHOLD)
            .count();

        if speech_frames >= SPEECH_FRAME_THRESHOLD {
            VadStatus::Speech
        } else if silence_frames > self.prob_history.len() / 2 {
            VadStatus::Silence
        } else {
            VadStatus::Unknown
        }
    }

    fn get_threshold(&self) -> f32 {
        match self.sensitivity {
            VadSensitivity::Low => 0.7,
            VadSensitivity::Medium => 0.5,
            VadSensitivity::High => 0.3,
        }
    }
}

impl VadEngine for SileroVad {
    fn is_voice_segment(&mut self, audio_chunk: &[f32]) -> anyhow::Result<bool> {
        const CHUNK_SIZE: usize = 1600; // 100 milliseconds

        let threshold = self.get_threshold();

        let mut chunk_data: Vec<f32> = audio_chunk.to_vec();
        chunk_data.resize(CHUNK_SIZE, 0.0);

        let result = self.vad.compute(&chunk_data).map_err(|e| {
            debug!("SileroVad Error computing VAD: {}", e);
            anyhow::anyhow!("Vad compute error: {}", e)
        })?;

        let status = self.update_status(result.prob);

        Ok(status == VadStatus::Speech && result.prob > threshold)
    }

    fn set_sensitivity(&mut self, sensitivity: VadSensitivity) {
        self.sensitivity = sensitivity;
    }

    fn get_min_speech_ratio(&self) -> f32 {
        self.sensitivity.min_speech_ratio()
    }
}

pub async fn create_vad_engine(engine: VadEngineEnum) -> anyhow::Result<Box<dyn VadEngine>> {
    match engine {
        VadEngineEnum::WebRtc => Ok(Box::new(WebRtcVad::new())),
        VadEngineEnum::Silero => {
            let silero_vad = SileroVad::new().await?;
            Ok(Box::new(silero_vad))
        }
    }
}

unsafe impl Send for WebRtcVad {}
unsafe impl Send for SileroVad {}
