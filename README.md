# TheOasis_Portal

The Oiasis of Metahuman

<!-- PROJECT LOGO -->
<br />

<p align="center">
  <a href="https://github.com/Qitu/TheOasis_Portal/">
    <img src="public/logo.png" alt="Logo" width="150">
  </a>

  <h3 align="center">Oasis Metahuman</h3>
  <p align="center">
    A configurable metahumen platform
    <br />
    <br />
  </p>

</p>

## Content

- [Installation](#Installation)
  - [EnvironmentSetup](#EnvironmentSetup)
  - [Steps](#Steps)
- [FolderStructure](#FolderStructure)
- [Deployment](#Deployment)
- [OpenFrameworks](#OpenFrameworks)
- [Contributors](#Contributors)
- [Thanks](#Thanks)

### Installation

###### EnvironmentSetup

- Intsalled NodeJs Env

###### **Steps**

1. Clone the repo


```sh
git clone https://github.com/Qitu/TheOasis_Portal.git
```

2. Install dependences

```sh
npm install
```

3. Run & Enjoy the project

```sh
npm run start
```


### FolderStructure


```
...
package.json
README.md
config
├── defaultSettings.ts    (Navigator settings)
├── routes.ts             (Web routes config)
├── proxy.ts              (Network proxy config)
├── config.ts             (Umi framework config)

public
├── Build                 (Unity-WebGL source)
├── ...                   (Relative resources)

src
├── /components/          (Global components)
├── /pages/
│  ├── /Conversation/     (Chat with metahuman)
│  ├── /MetahumanDetail/  (Edit metahuman detail)
│  ├── /User/             (Authorization)
│  ├── 404.tsx
│  ├── ...
├── app.tsx
└── ...

```
### Deployment

Check **.github/workflows/ci.yml**

### OpenFrameworks

- [Ant Design](https://ant.design/)
- [Umi](https://umijs.org/)
- [Unity](https://unity.com/)
- [React](https://react.dev/)

### Contributors

Cheers for our contributors!
1. RuiDi Xu
2. Dezhen Yang
3. Zhijian Wang
4. PangBo
5. ZengYang

### Thanks

- [NUS-ISS](https://www.iss.nus.edu.sg/)
- [Github](https://github.com/)
- [Alibaba Iconfront](https://www.iconfont.cn/)
- [DigitalOcean](https://www.digitalocean.com/)
