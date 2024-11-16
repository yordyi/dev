struct ContentView: View {
    @StateObject private var store = BookmarkStore()
    @State private var searchText = ""
    @State private var selectedTags: Set<String> = []
    
    var body: some View {
        NavigationSplitView {
            Sidebar(selectedTags: $selectedTags)
        } content: {
            BookmarkList(
                bookmarks: filteredBookmarks,
                searchText: $searchText
            )
        } detail: {
            BookmarkDetail()
        }
    }
    
    private var filteredBookmarks: [Bookmark] {
        store.bookmarks.filter { bookmark in
            let matchesSearch = searchText.isEmpty || 
                bookmark.title.localizedCaseInsensitiveContains(searchText)
            let matchesTags = selectedTags.isEmpty || 
                !selectedTags.isDisjoint(with: Set(bookmark.tags))
            return matchesSearch && matchesTags
        }
    }
} 