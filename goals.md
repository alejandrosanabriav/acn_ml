## DONATE_MONTHLY
- type: destination
- destination: regular expression | /thanks-for-your-monthly-commitment/

## UNIQUE_DONATION
- type: destination
- destination: regular expression | /thanks-for-your-donation/

## SUBSCRIBE
- type: destination
- destination: regular expression | /thanks-for-praying-with-us/

## DONATION_CLICK
- type: Event
- event condition
	- category: DONATION
	- action: DONATION_CLICK
	- label: DONATION_CLICK
	- value: 0

## SHARE
- type: Event
- event condition
	- category: SHARE
	- action: SHARE
	- label: SHARE
	- value: 0
