const layDuLieu = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Đây là dữ liệu bí mật của hệ thống");
    }, 2000);
  });
};


async function chayThu() {

  console.log("Đang lấy dữ liệu...");

  const ketQua = await layDuLieu();

  console.log(ketQua);
}


chayThu();