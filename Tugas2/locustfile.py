from locust import HttpUser, between, constant, task, events
from locust.runners import MasterRunner
from json import JSONDecodeError

@events.init.add_listener
def on_locust_init(environment, **kwargs):
    if isinstance(environment.runner, MasterRunner):
        print("I'm on master node")
    else:
        print("I'm on a worker or standalone node")

class HelloWorldUser(HttpUser):
    wait_time = constant(1)

    # @task(3)
    # def adder(self):
    #     for param1 in range(10, 100):
    #         param2 = param1 ** param1
    #         self.client.get("/add-1/%i/%i" % (param1, param2), name="/add-1/[param1]/[param2]")

    @task
    def add56(self):
        # self.client.get("/add-1/5/6")
        self.client.get("/mahasiswa")

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