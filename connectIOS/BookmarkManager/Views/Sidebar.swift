struct Sidebar: View {
    @EnvironmentObject private var store: BookmarkStore
    @Binding var selectedTags: Set<String>
    
    var body: some View {
        List(selection: $selectedTags) {
            Section("智能列表") {
                NavigationLink(value: "all") {
                    Label("所有书签", systemImage: "bookmark")
                }
                NavigationLink(value: "favorites") {
                    Label("收藏", systemImage: "star.fill")
                }
            }
            
            Section("标签") {
                ForEach(store.getAllTags(), id: \.self) { tag in
                    NavigationLink(value: tag) {
                        Label(tag, systemImage: "tag")
                    }
                }
            }
        }
        .navigationTitle("书签")
    }
} 