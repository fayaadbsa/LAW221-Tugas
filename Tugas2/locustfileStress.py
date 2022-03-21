from locust import HttpUser, between, constant, task, events
from locust.runners import MasterRunner
from json import JSONDecodeError
import random

class LoadTest(HttpUser):
    wait_time = constant(1)

    def setup(self):
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

    # @task(4)
    # def create(self):
    #     self.client.post("/mahasiswa", {
    #         "nama": "tuyul",
    #         "pilihan1": "ddp - a",
    #         "pilihan1": "matdas - c"
    #     })

    @task
    def update(self):
        i = random.randint(0, 100)
        self.client.put("/mahasiswa/%i" % i, {
            "nama": "gantinama",
            "pilihan1": "ddp - b",
            "pilihan1": "matdas - d"
        }, name="/mahasiswa/[id] (put)")



    # @task
    # def update(self):
    #     self.client.put("/mahasiswa")

    # @task
    # def login(self):
    #   response = self.client.post("/login", {"username":"testuser", "password":"secret"})
    #   print("Response status code:", response.status_code)
    #   print("Response text:", response.text)
    #   response = self.client.get("/my-profile")

    # with self.client.get("/", catch_response=True) as response:
    #   if response.text != "Success":
    #       response.failure("Got wrong response")
    #   elif response.elapsed.total_seconds() > 0.5:
    #       response.failure("Request took too long")

    # with self.client.get("/does_not_exist/", catch_response=True) as response:
    #   if response.status_code == 404:
    #       response.success()

    # with self.client.post("/", json={"foo": 42, "bar": None}, catch_response=True) as response:
    #   try:
    #       if response.json()["greeting"] != "hello":
    #           response.failure("Did not get expected value in greeting")
    #   except JSONDecodeError:
    #       response.failure("Response could not be decoded as JSON")
    #   except KeyError:
    #       response.failure("Response did not contain expected key 'greeting'")

# https://github.com/SvenskaSpel/locust-plugins/blob/master/examples/rest_ex.py
