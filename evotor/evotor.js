KeyAccessDev = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjM3MzM1MDY5NDQsInVzZXJfbmFtZSI6IjYwOGUwOTM2LWM3NjktNGEzOS05YmYzLTcxMzA3Zjg2YzAzMCIsImF1dGhvcml0aWVzIjpbIlJPTEVfUFVCTElTSEVSIl0sImp0aSI6IjJiMmQ3YzY0LTliZmMtNDMzNi04NTIyLWUyNzZlMjZkMjA2YyIsImNsaWVudF9pZCI6ImQ5ODA5M2Q2MTk0MGQxZjVhNWFkOGY0NDZkMTcyM2UwIiwic2NvcGUiOlsicHVzaC1ub3RpZmljYXRpb246d3JpdGUiXX0.sXLhc8ZmTk2TDPa83OJLoVyUVgm_ZiZPlG1FPAlTn_c"

const evo = {
  app: {
    name: "New_test_app",
    version: 0.1,
    uuid: "63163abe-bd4e-428a-84d4-19728aa23377"
  },
  token: "6ef2370f-ed79-43b7-8a7c-f7b83175fef2",
  //   6ef2370f-ed79-43b7-8a7c-f7b83175fef2
  stores: {
    uuid: "20180608-EEA0-408D-807D-6AB73272E383",
    // 20180608-EEA0-408D-807D-6AB73272E383
    address: "null",
    name: "Мой магазин"
  },
  devices: {
    uuid: "20180608-D09E-409D-8015-A35AAA2D3487",
    name: "Моя касса №1",
    storeUuid: "20180608-EEA0-408D-807D-6AB73272E383",
    timezoneOffset: 14400000
  },
  commodity: [
    {
      uuid: "E30947D4-9DE1-2C2E-9920-F69A49C7E28E", //required
      group: false,//required
      hasVariants: null,
      type: "NORMAL",//required group = false
      name: "Зоокумарин+ Rubit 100 г. зерно",//required
      code: "957",
      barCodes: ["4607126901523"],//group = false nullable
      price: 0,//required group = false not null
      costPrice: 0,//group = false not null
      quantity: 0,//required group = false not null
      measureName: "шт",//required group = false not null
      tax: "NO_VAT",//required group = false not null
      allowToSell: true,//required group = false not null
      description: null,//group = false nullable
      articleNumber: null,//group = false nullable
      parentUuid: "9349aaca-79a1-4e51-bca1-8b633d73f18d", //nullable
      alcoCodes: null,
      alcoholByVolume: null,
      alcoholProductKindCode: null,
      tareVolume: null
    },
    {
      uuid: "6f373799-f55d-a606-e1f9-87a8b5239d3c",
      group: true,
      hasVariants: null,
      type: null,
      name: "Канцтовары",
      code: "578",
      barCodes: null,
      price: null,
      costPrice: null,
      quantity: 0,
      measureName: null,
      tax: "NO_VAT",
      allowToSell: true,
      description: null,
      articleNumber: null,
      parentUuid: null,
      alcoCodes: null,
      alcoholByVolume: null,
      alcoholProductKindCode: null,
      tareVolume: null
    }
  ]
};

