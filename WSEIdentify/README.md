# Gatekeeper Revised

The identification system for the Johns Hopkins WSE student shop. This was first implemented to alleviate safety concerns regarding students using machines without proper training. The initial implementation of this system had technology that was difficult and expensive to maintain (fingerprint scanners), so an alternative solution was sought for. Instead of using students' fingerprints, the system now uses their J-Cards to detect whether or not the student has access to a certain machine.

## Installation 

Run the setup bash script available in the repository. Follow the prompts (TODO).
```bash
./setup_pi
```

## Usage

Clone this repo onto a Raspberry PI and run the setup bash script. 
TODO.

## Maintenance

Set up the .env (see .env.example) with the URL's of the server being hosted on.

```env
VITE_API_URL = {API_URL_LINK}
VITE_BASE_URL = {APPLICATION_URL_LINK}
```











