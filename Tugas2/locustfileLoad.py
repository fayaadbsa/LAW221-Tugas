from locust import HttpUser, between, constant, task

import random


class LoadTest(HttpUser):
    wait_time = constant(1)

    def on_start(self):
        for i in range(100):
            self.client.post("/mahasiswa", {
                "nama": "tuyul-init",
                "pilihan1": "ddp - a",
                "pilihan1": "matdas - c"
            }, name="/mahasiswa/[id] (post)")

    @task(4)
    def findAll(self):
        self.client.get("/mahasiswa")

    @task
    def findOne(self):
        i = random.randint(0, 100)
        self.client.get("/mahasiswa/%i" % i, name="/mahasiswa/[id] (get)")

    @task
    def update(self):
        i = random.randint(0, 100)
        self.client.put("/mahasiswa/%i" % i, {
            "nama": "gantinama",
            "pilihan1": "ddp - b",
            "pilihan1": "matdas - d"
        }, name="/mahasiswa/[id] (put)")
