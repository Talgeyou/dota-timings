[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h3 align="center">Clicker</h3>
  <p align="center">
    Overlay for the Dota 2.
    <br />
    <a href="https://github.com/Talgeyou/dota-timings"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Talgeyou/dota-timings/issues">Report Bug</a>
    ·
    <a href="https://github.com/Talgeyou/dota-timings/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This app is a overlay with some widgets for the Dota 2.
You can track Roshan timings, Aegis expiration, runes and your current GPM and XPM

### Built With

- [Electron React Boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate) - Boilerplate for electron with React as renderer

<!-- GETTING STARTED -->

## Getting Started

So, let's install the overlay

### Prerequisites

You should enable dota 2 game state integration.

1. Go to game state integration directory or create it inside the dota 2 directory:
   ```sh
   D:\SteamLibrary\steamapps\common\dota 2 beta\game\dota\cfg\gamestate_integration
   ```
2. Create a file for the overlay:
   ```sh
   gamestate_integration_dota-timings.cfg
   ```
   and name and paste following content there:
   ```sh
   "Dota Timings v1.0.1"
    {
      "uri"        "http://localhost:3000"
      "timeout" 	"5.0"
      "buffer"  	"0.1"
      "throttle" 	"0.1"
      "heartbeat" 	"30.0"
      "data"
      {
        "map"          "1"
        "player"       "1"
        "hero"         "1"
        "events"       "1"
      }
    }
   ```
3. And add the `-gamestateintegration` to the launch options of the dota 2

### Installation

1. Download latest release
2. Install

<!-- ROADMAP -->

## Roadmap

See the [open issues](https://github.com/Talgeyou/dota-timings/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Ilia Dereviashkin - Telegram [@otalge](https://t.me/otalge)

Project Link: [https://github.com/Talgeyou/dota-timings/](https://github.com/Talgeyou/dota-timings/)

[contributors-shield]: https://img.shields.io/github/contributors/Talgeyou/dota-timings.svg?style=for-the-badge
[contributors-url]: https://github.com/Talgeyou/dota-timings/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Talgeyou/dota-timings.svg?style=for-the-badge
[forks-url]: https://github.com/Talgeyou/dota-timings/network/members
[stars-shield]: https://img.shields.io/github/stars/Talgeyou/dota-timings.svg?style=for-the-badge
[stars-url]: https://github.com/Talgeyou/dota-timings/stargazers
[issues-shield]: https://img.shields.io/github/issues/Talgeyou/dota-timings.svg?style=for-the-badge
[issues-url]: https://github.com/Talgeyou/dota-timings/issues
[license-shield]: https://img.shields.io/github/license/Talgeyou/dota-timings.svg?style=for-the-badge
[license-url]: https://github.com/Talgeyou/dota-timings/blob/master/LICENSE.txt
