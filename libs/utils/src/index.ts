export const findMe = (): Promise<null | { lat: number; long: number }> => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null);
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            long: position.coords.longitude,
          };
          resolve(location);
        },
        () => {
          resolve(null);
        },
      );
    }
  });
};
