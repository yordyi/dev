struct Bookmark: Identifiable, Codable {
    let id: UUID
    var title: String
    var url: URL
    var createdAt: Date
    var tags: [String]
    var isFavorite: Bool
    
    init(id: UUID = UUID(), title: String, url: URL, tags: [String] = [], isFavorite: Bool = false) {
        self.id = id
        self.title = title
        self.url = url
        self.createdAt = Date()
        self.tags = tags
        self.isFavorite = isFavorite
    }
} 