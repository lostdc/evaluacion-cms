// Esta función verifica si el usuario tiene un permiso específico.
export const userHasPermission = (permission: string): boolean => {
  const permissionsString = localStorage.getItem('permissions');
  const permissions = permissionsString ? JSON.parse(permissionsString) : [];
  return permissions.includes(permission);
};

export const userHasRole = (role: string): boolean => {
  const roleString = localStorage.getItem('role');
  return roleString === role;
};

export const IsAuthenticated = () => {
  const token = localStorage.getItem('token');
  return (!!token); // Establecer isAuthenticated como verdadero si hay un token presente en el LocalStorage
};

