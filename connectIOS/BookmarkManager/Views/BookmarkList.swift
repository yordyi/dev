struct BookmarkList: View {
    let bookmarks: [Bookmark]
    @Binding var searchText: String
    @State private var showingAddSheet = false
    @State private var sortOrder: SortOrder = .dateAdded
    
    enum SortOrder {
        case dateAdded, title, favorite
    }
    
    var sortedBookmarks: [Bookmark] {
        switch sortOrder {
        case .dateAdded:
            return bookmarks.sorted { $0.createdAt > $1.createdAt }
        case .title:
            return bookmarks.sorted { $0.title < $1.title }
        case .favorite:
            return bookmarks.sorted { $0.isFavorite && !$1.isFavorite }
        }
    }
    
    var body: some View {
        List(sortedBookmarks) { bookmark in
            BookmarkRow(bookmark: bookmark)
        }
        .searchable(text: $searchText, prompt: "搜索书签...")
        .toolbar {
            ToolbarItem {
                Menu {
                    Picker("排序", selection: $sortOrder) {
                        Label("添加时间", systemImage: "clock").tag(SortOrder.dateAdded)
                        Label("标题", systemImage: "textformat").tag(SortOrder.title)
                        Label("收藏", systemImage: "star").tag(SortOrder.favorite)
                    }
                } label: {
                    Label("排序", systemImage: "arrow.up.arrow.down")
                }
            }
            
            ToolbarItem {
                Button(action: { showingAddSheet = true }) {
                    Label("添加", systemImage: "plus")
                }
            }
        }
        .sheet(isPresented: $showingAddSheet) {
            AddBookmarkView()
        }
    }
} 