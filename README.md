# Visometer

[Skudunter](https://visometer.vercel.app)  
a website that displays weather data relating to diving conditions🤿🌊 .  

***made possible by the [yr-weather](https://developer.yr.no/) and [stormglass.io](https://dashboard.stormglass.io/login?next=%2F) apis***.

## How to Run

```
npm i
npm run dev
```
## Note
You will need to add a **.env.local** file in the project root directory to access the apis for the weather data and send emails.
 ### .env.local
 ```
  NODEMAILER_USERNAME=yourNodeMailerUsername  
  NODEMAILER_PASSWORD=yourNodeMailerPassword    
  STORMGLASS_API_KEY=yourStormglassAPIKey
```
