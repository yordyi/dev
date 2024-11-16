import '@craftdocs/craft-extension-api';

const GOOGLE_PHOTOS_API_BASE = 'https://photoslibrary.googleapis.com/v1';

export async function initExtension() {
  const token = await getOrRequestToken();
  if (token) {
    await loadAndDisplayAlbums(token);
  }
}

async function getOrRequestToken() {
  let token = await craft.storageApi.get('googleAuthToken');
  if (!token) {
    token = await requestToken();
  }
  return token;
}

async function requestToken() {
  return new Promise((resolve) => {
    craft.ui.showDialog({
      title: '登录Google账号',
      submit: '登录',
      close: '取消',
      fields: [
        {
          name: 'token',
          type: 'text',
          label: '请输入Google授权token'
        }
      ],
      onSubmit: async (data) => {
        await craft.storageApi.put('googleAuthToken', data.token);
        resolve(data.token);
      },
      onClose: () => resolve(null)
    });
  });
}

async function loadAndDisplayAlbums(token) {
  try {
    const albums = await fetchGoogleAlbums(token);
    displayAlbumSelection(albums, token);
  } catch (error) {
    craft.ui.showToast('获取相册列表失败: ' + error.message, {style: 'failure'});
  }
}

async function fetchGoogleAlbums(token) {
  const response = await fetch(`${GOOGLE_PHOTOS_API_BASE}/albums`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data.albums || [];
}

function displayAlbumSelection(albums, token) {
  craft.ui.showDialog({
    title: '选择要导入的相册',
    submit: '导入',
    close: '取消',
    fields: [
      {
        name: 'album',
        type: 'select',
        label: '选择相册',
        options: albums.map(album => ({ value: album.id, label: album.title }))
      }
    ],
    onSubmit: async (data) => {
      await importAlbum(data.album, token);
    }
  });
}

async function importAlbum(albumId, token) {
  try {
    craft.ui.showToast('开始导入相册...', {style: 'info'});
    const photos = await fetchAlbumPhotos(albumId, token);
    const page = await createCraftPage('导入的Google相册');
    await addPhotosToPage(photos, page.id);
    craft.ui.showToast('相册导入成功!', {style: 'success'});
  } catch (error) {
    craft.ui.showToast('导入相册失败: ' + error.message, {style: 'failure'});
  }
}

async function fetchAlbumPhotos(albumId, token) {
  const response = await fetch(`${GOOGLE_PHOTOS_API_BASE}/mediaItems:search`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      albumId: albumId,
      pageSize: 100 // 可以根据需要调整
    })
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data.mediaItems || [];
}

async function createCraftPage(title) {
  return await craft.dataApi.addPage({
    title: title
  });
}

async function addPhotosToPage(photos, pageId) {
  const blocks = photos.map(photo => ({
    type: 'image',
    url: photo.baseUrl,
    pageId: pageId
  }));
  await craft.dataApi.addBlocks(blocks);
}
