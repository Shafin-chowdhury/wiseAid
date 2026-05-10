from fastapi import FastAPI, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
import time

app = FastAPI(title="WiseAid Backend")

# Enable CORS so Next.js can talk to FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock Database for Research Logs
emergency_logs = []

def notify_iot_device():
    """
    This is where your IoT logic will go. 
    For now, it just simulates a delay.
    """
    print(">>> LOG: Sending MQTT signal to IoT Ring...")
    time.sleep(1) # Simulating network latency
    print(">>> LOG: IoT Ring Activated successfully.")

@app.post("/trigger-emergency")
async def trigger_emergency(background_tasks: BackgroundTasks):
    # 1. Log the event (Great for your research data)
    timestamp = time.strftime('%Y-%m-%d %H:%M:%S')
    emergency_logs.append({"event": "SOS_TRIGGERED", "time": timestamp})
    
    # 2. Trigger the IoT notification in the background
    background_tasks.add_task(notify_iot_device)
    
    return {
        "status": "notified",
        "timestamp": timestamp,
        "device_target": "Admin_Physical_Ring_01"
    }

@app.get("/logs")
async def get_logs():
    return {"history": emergency_logs}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)