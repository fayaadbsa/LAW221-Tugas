#!/usr/bin/env python
import pika, sys

# Init
connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
channel = connection.channel()

# create queue
channel.queue_declare(queue='task_queue', durable=True)

# send message
message = ' '.join(sys.argv[1:]) or "Hello World!"
channel.basic_publish(exchange='',
                      routing_key='task_queue',
                      body=message,
                      properties=pika.BasicProperties(
                         delivery_mode = pika.spec.PERSISTENT_DELIVERY_MODE
                      ))
print(" [x] Sent %r" % message)

# end
connection.close()




print(" [x] Sent %r" % message)