import http from "k6/http";
import { sleep } from "k6";

export let options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  stages: [
    { duration: "5m", target: 100 },
    { duration: "10m", target: 100 },
    { duration: "5m", target: 0 },
  ],
};

const API_BASE_URL =
  "http://host-1906398433-port-58433.proxy.infralabs.cs.ui.ac.id";

export default () => {
  const response = http.post(
    `${API_BASE_URL}/mahasiswa/`,
    JSON.stringify({
      nama: "fayaad",
      pilihan1: "ddp-a",
      pilihan2: "matdas-a",
    }),
    { headers: { "Content-Type": "application/json" } }
  );

  const mahasiswaId = JSON.parse(response.body).id

  http.batch([
    ["GET", `${API_BASE_URL}/mahasiswa`],
    ["GET", `${API_BASE_URL}/mahasiswa/${mahasiswaId}`],
    [
      "PUT",
      `${API_BASE_URL}/mahasiswa/${mahasiswaId}`,
      JSON.stringify({
        nama: "fayaad",
        pilihan1: "ddp-c",
        pilihan2: "matdas-c",
      }),
      { headers: { "Content-Type": "application/json" } },
    ],
  ]);

  sleep(1);
};

// Referensi : https://www.youtube.com/watch?v=r-Jte8Y8zag
