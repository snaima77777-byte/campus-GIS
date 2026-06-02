export function startLocationWatch(
  callback: (lon: number, lat: number) => void,
) {
  if (!navigator.geolocation) {
    alert("当前设备不支持GPS");
    return;
  }

  navigator.geolocation.watchPosition(
    (position) => {
      callback(position.coords.longitude, position.coords.latitude);
    },
    (error) => {
      console.error(error);
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    },
  );
}
