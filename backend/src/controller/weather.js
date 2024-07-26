const env=require('dotenv')
env.config({path:'./.env'})
const apikey=process.env.API_SECURITY_KEY
const axios=require('axios')
const getCurrentCity=async(req,res,next)=>{
    console.log('success');
    try {
        const city = req.query.city
        if(!city){
            res.status(400).json({ 
                status:'failed',
                message:'please provide city field' 
            })
        }
    const data=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`)
    const convertUnixToDate = (unixTimestamp) => {
        const date = new Date(unixTimestamp * 1000);
        return date.toLocaleString(); 
      };
    return res.status(200).json({
        status: 'success',
        data: {
            coord: data.data.coord,
            weather: data.data.weather,
            base: data.data.base,
            main: data.data.main,
            visibility: data.data.visibility,
            wind: data.data.wind,
            clouds: data.data.clouds,
            dt:convertUnixToDate(data.data.dt),
            sys:data.data.sys,
            timezone: data.data.timezone,
            id: data.data.id,
            name: data.data.name,
            cod: data.data.cod
          }
        });
      
    } catch (error) {
        console.error(error);
        return res.status(500).json({
          status: 'failed',
          message: 'Internal Server Error'
        });
    }
    }
    
    const getForcast = async (req, res) => {
        try {
            console.log('Fetching forecast data');
            const { lat, lon } = req.query;
            console.log(lat, lon, "lattt");
            if (!lat || !lon) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Latitude or longitude is not provided'
                });
            }
    
            if (!apikey) {
                return res.status(500).json({
                    status: 'failed',
                    message: 'API key is missing'
                });
            }
    
            const forecastData = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}`);
    
            // Get current date
            const currentDate = new Date().toISOString().split('T')[0];
    
            // Filter forecast data for current day
            const todaysForecast = forecastData.data.list.filter(item => {
                const itemDate = item.dt_txt.split(' ')[0];
                return itemDate === currentDate;
            });
    
            // Process the forecast data
            const processedForecast = todaysForecast.map(item => ({
                time: item.dt_txt.split(' ')[1],
                temperature: {
                    celsius: (item.main.temp - 273.15).toFixed(2),
                    fahrenheit: ((item.main.temp - 273.15) * 9/5 + 32).toFixed(2)
                },
                weather: {
                    main: item.weather[0].main,
                    description: item.weather[0].description,
                    icon: item.weather[0].icon
                },
                humidity: item.main.humidity,
                wind: {
                    speed: item.wind.speed,
                    direction: item.wind.deg
                },
                clouds: item.clouds.all
            }));
    
            res.json({
                status: 'success',
                data: processedForecast
            });
        } catch (error) {
            console.error('Error fetching forecast:', error.message || error);
            res.status(500).json({
                status: 'error',
                message: 'Failed to fetch weather forecast',
                error: error.message || 'Unknown error'
            });
        }
    };
    
    


module.exports={getCurrentCity,getForcast}