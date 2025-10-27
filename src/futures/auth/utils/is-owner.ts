type Entity = {
  userId: string;
};
type AuthUser = {
  id: string;
};

const isOwner = async (user: AuthUser, entity: Entity) => {
  return user.id === entity.userId;
};

export { isOwner, type AuthUser };
