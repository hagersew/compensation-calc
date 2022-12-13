export interface IListItemProps {
  color?: string;
  children: React.ReactNode;
}

const BadgeColor = (color: string) => {
  return (
    <div
      className="my-2 mx-2"
      style={{
        width: '16px',
        height: '4px',
        backgroundImage: color,
      }}
    />
  );
};

const ListItem = ({ color, children }: IListItemProps) => {
  return (
    <div className="flex">
      {BadgeColor(color!)}
      {children}
    </div>
  );
};

export default ListItem;
