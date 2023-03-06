const { DateTime } = require('luxon');
const countryUtils = require('./country');

const buildResponseStatistics = ({ averageDistance, maxDistance, minDistance }) => ({
  average_distance: `${averageDistance.dataValues.average_distance} Kms`,
  max_distance: `${maxDistance.distance} Kms`,
  min_distance: `${minDistance.distance} Kms`,
  max_locale: `${maxDistance.city}, ${maxDistance.country}`,
  min_locale: `${minDistance.city}, ${minDistance.country}`,
});

const buildResponseIpInfo = async (ipData) => {
  const dataCountry = await countryUtils.getCountryCache(ipData.country_code);
  const currentDateUtc = DateTime.utc();
  const currentDate = DateTime.local();
  // Format current date.
  const localCurrentDate = currentDate.toFormat('dd/MM/yyyy HH:mm:ss');

  // Get dates of the distinct country zone times.
  const zoneTimes = countryUtils.getCountryZoneTimes(dataCountry.timezones, currentDateUtc);

  // Get country languages
  const languages = countryUtils.getCountryLanguages(ipData.location.languages);
  // Get about the country's currencies and their exchange against the dollar.
  const currency = await countryUtils.getCountryCurrencys(dataCountry.currencies);

  const distance = countryUtils.calculateDistanceAtBsAs(ipData.latitude, ipData.longitude);
  const distanceEstimated = countryUtils.formatDistanceMessage(distance, [
    ipData.latitude.toFixed(0),
    ipData.longitude.toFixed(0),
  ]);

  return {
    ip: ipData.ip,
    currentDate: localCurrentDate,
    country: ipData.country_name,
    isoCode: ipData.country_code,
    languages,
    currency,
    zoneTimes,
    distanceEstimated,
    distance,
  };
};

module.exports = {
  buildResponseIpInfo,
  buildResponseStatistics,
};
