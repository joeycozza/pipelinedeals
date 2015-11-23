# pipelinedeals
A node module for easier access to the GET calls of the PipelineDeals API. 
This essentially is just a wrapper around the pagination that they implement.

It will always return an array of entries (even with the profile.json call)

##Usage
```
var pld = require('pipelinedeals');
var options = {
              endpoint: 'deals.json',
              apiKey: 'INSERT_API_KEY_HERE'
              };
pld.get(options, function(err, entries){
  //here you have access to the data from the call
});
```

Options should appear as such
```javascript
{
  endpoint: STRING, //REQUIRED
  apiKey: STRING, //REQUIRED
  paginationDelay: NUMBER, //OPTIONAL Defaults to 0
  debug: BOOLEAN //OPTIONAL Defaults to false
}
```
There is a strict 5 calls per second that pipelinedeals enforces. While the calls are already made sequentially
and timeout problems are low, you have the option to add an extra wait time before making the next paged call.
Pass in the number of milliseconds you want to wait.

The endpoint for this url `https://api.pipelinedeals.com/api/v3/deals.json` is `deals.json`
The endpoint for this url `https://api.pipelinedeals.com/api/v3/account_notifications.json` is `account_notifications.json`
