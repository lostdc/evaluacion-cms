// Esta función verifica si el usuario tiene un permiso específico.
export const userHasPermission = (permission: string): boolean => {
  const permissionsString = localStorage.getItem('permissions');
  const permissions = permissionsString ? JSON.parse(permissionsString) : [];
  return permissions.includes(permission);
};


export const userHasRole = (role: string): boolean => {
  const rolesString = localStorage.getItem('role');
  const roles = rolesString ? JSON.parse(rolesString) : [];
  return role.includes(role);
};



