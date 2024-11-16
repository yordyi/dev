@MainActor
class BookmarkStore: ObservableObject {
    @Published private(set) var bookmarks: [Bookmark] = []
    
    // CRUD 操作
    func add(_ bookmark: Bookmark) {
        bookmarks.append(bookmark)
        saveBookmarks()
    }
    
    func update(_ bookmark: Bookmark) {
        if let index = bookmarks.firstIndex(where: { $0.id == bookmark.id }) {
            bookmarks[index] = bookmark
            saveBookmarks()
        }
    }
    
    func delete(_ bookmark: Bookmark) {
        bookmarks.removeAll { $0.id == bookmark.id }
        saveBookmarks()
    }
    
    // 数据持久化
    private func saveBookmarks() {
        do {
            let data = try JSONEncoder().encode(bookmarks)
            try data.write(to: getStorageURL())
        } catch {
            print("保存书签失败: \(error)")
        }
    }
    
    private func loadBookmarks() {
        do {
            let data = try Data(contentsOf: getStorageURL())
            bookmarks = try JSONDecoder().decode([Bookmark].self, from: data)
        } catch {
            print("加载书签失败: \(error)")
        }
    }
    
    private func getStorageURL() -> URL {
        FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0]
            .appendingPathComponent("bookmarks.json")
    }
    
    // 搜索和过滤
    func search(query: String) -> [Bookmark] {
        guard !query.isEmpty else { return bookmarks }
        return bookmarks.filter { bookmark in
            bookmark.title.localizedCaseInsensitiveContains(query) ||
            bookmark.tags.contains { $0.localizedCaseInsensitiveContains(query) }
        }
    }
    
    func getAllTags() -> [String] {
        Array(Set(bookmarks.flatMap { $0.tags })).sorted()
    }
} 