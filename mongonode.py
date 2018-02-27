import time
import os

time.sleep(3)
print("Abrindo MongoDB")
os.spawnl(os.P_DETACH, 'C:\\mongod')
time.sleep(3)
print("Abrindo Node.js")
os.spawnl(os.P_DETACH, 'E:\\Jobs\\HUGO\\node\\app\\node app.js')
