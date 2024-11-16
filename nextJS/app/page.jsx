import LikeButton from "./like-button";

function Header({ title }) {
  return <h1>{title ? title : "Default title"}</h1>;
}
export default function HomePage() {
  const names = ["北京", "上海", "广州", "深圳"];

  return (
    <div>
      <Header title="中华人民共和国万岁" />
      <ul>
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <LikeButton />
    </div>
  );
}
