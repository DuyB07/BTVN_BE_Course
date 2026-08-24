function chiaHaiSo(a, b) {

  if (b === 0) {
    throw new Error("Không thể chia cho 0 được bạn êi!");
  }

  return a / b;
}


async function main() {

  try {

    const ketQua = chiaHaiSo(10, 0);

    console.log("Kết quả:", ketQua);

  } catch (error) {

    console.log(error.message);

  }

}


main();