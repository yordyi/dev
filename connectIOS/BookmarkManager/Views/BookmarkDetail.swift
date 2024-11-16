struct BookmarkDetail: View {
    let bookmark: Bookmark?
    @EnvironmentObject private var store: BookmarkStore
    @State private var isEditing = false
    
    var body: some View {
        if let bookmark = bookmark {
            ScrollView {
                VStack(alignment: .leading, spacing: 16) {
                    HStack {
                        Text(bookmark.title)
                            .font(.title)
                        Spacer()
                        Button {
                            isEditing = true
                        } label: {
                            Image(systemName: "pencil")
                        }
                    }
                    
                    Link(destination: bookmark.url) {
                        Text(bookmark.url.absoluteString)
                            .foregroundColor(.blue)
                    }
                    
                    if !bookmark.tags.isEmpty {
                        FlowLayout(spacing: 8) {
                            ForEach(bookmark.tags, id: \.self) { tag in
                                Text(tag)
                                    .padding(.horizontal, 12)
                                    .padding(.vertical, 6)
                                    .background(Color.secondary.opacity(0.2))
                                    .cornerRadius(12)
                            }
                        }
                    }
                }
                .padding()
            }
            .sheet(isPresented: $isEditing) {
                EditBookmarkView(bookmark: bookmark)
            }
        } else {
            Text("选择一个书签查看详情")
                .foregroundColor(.secondary)
        }
    }
} 