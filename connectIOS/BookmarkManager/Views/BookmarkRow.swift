struct BookmarkRow: View {
    let bookmark: Bookmark
    @EnvironmentObject private var store: BookmarkStore
    
    var body: some View {
        NavigationLink(value: bookmark) {
            HStack {
                VStack(alignment: .leading) {
                    Text(bookmark.title)
                        .font(.headline)
                    Text(bookmark.url.absoluteString)
                        .font(.caption)
                        .foregroundColor(.secondary)
                    if !bookmark.tags.isEmpty {
                        ScrollView(.horizontal, showsIndicators: false) {
                            HStack {
                                ForEach(bookmark.tags, id: \.self) { tag in
                                    Text(tag)
                                        .font(.caption)
                                        .padding(.horizontal, 8)
                                        .padding(.vertical, 4)
                                        .background(Color.secondary.opacity(0.2))
                                        .cornerRadius(8)
                                }
                            }
                        }
                    }
                }
                
                Spacer()
                
                if bookmark.isFavorite {
                    Image(systemName: "star.fill")
                        .foregroundColor(.yellow)
                }
            }
            .padding(.vertical, 4)
        }
        .swipeActions(edge: .trailing) {
            Button(role: .destructive) {
                store.delete(bookmark)
            } label: {
                Label("删除", systemImage: "trash")
            }
            
            Button {
                var updatedBookmark = bookmark
                updatedBookmark.isFavorite.toggle()
                store.update(updatedBookmark)
            } label: {
                Label(
                    bookmark.isFavorite ? "取消收藏" : "收藏",
                    systemImage: bookmark.isFavorite ? "star.slash" : "star"
                )
            }
            .tint(.yellow)
        }
    }
} 