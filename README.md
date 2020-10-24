### Codebase Angular Ionic

```

{
  "rules": {
    ".read": "now < 1605927600000",  // 2020-11-21
    ".write": "now < 1605927600000",  // 2020-11-21
    "bookings": {
      ".indexOn": ["userId"]
    }
  }
}

```

```
https://gist.github.com/kmathy/7bd6ddd8599e7c6b9a96d6b47d1e35a2#file-base-with-injector-component-ts
https://gist.github.com/kmathy/242b4c7287d6d9ec562a73162329d30e#file-c-component-ts
https://medium.com/better-programming/angular-inheritance-without-effort-8200c8d87972
```

### Icons & Splash Screen for iOS

- Image Gorilla

### Android Deploy

- Build > Generate Signid Bundle > KeyStore Path Password
- Google Playstore Console
- Pay Registration
- Create Application
- Fill Application
- App Release > Manage > Create relase > Continue > Browses Apk

### iOS Deploy

- Targets > App > Provisioning Profile
- Devoper Account > Developer.apple.com
- Certificate and Id profile > App Ids > + ID > descrition
- Bundle ID from xcode
- Continue and register

#### Account > App Store Connect > My apps > + > new app

- fill form > Bundle ID > SKU > whatever > Create
- Full everything

### on Xcode stop

- genric ios devices as target
- Product > Archive > Distribute App
