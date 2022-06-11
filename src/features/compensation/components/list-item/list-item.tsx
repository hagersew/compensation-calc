export interface IListItemProps {
  color?: string;
  children: React.ReactNode;
}

const ListItem = ({ color, children }: IListItemProps) => {
  return (
    <div className="flex">
      <div
        className="my-2 mx-2"
        style={{
          width: '16px',
          height: '4px',
          backgroundImage: color,
        }}
      ></div>
      {children}
    </div>
  );
};

export default ListItem;
