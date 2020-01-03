this.toolData = [
  {
    nodeName: 'start-event',
    type: 'StartEvent',
    group: 'event',
    className: 'iconfont iconkaishi end',
    title: '开始',
    iconD: 'M750.545 481.772l-349.09-201.545a34.843 34.843 0 0 0-34.91 0 34.897 34.897 0 0 0-17.454 30.228v403.09c0 12.478 6.659 24 17.454 30.228A34.85 34.85 0 0 0 384 748.456a34.85 34.85 0 0 0 17.455-4.683l349.09-201.545A34.896 34.896 0 0 0 768 512c0-12.477-6.659-24-17.455-30.228zM418.909 653.079V370.92L663.272 512 418.909 653.079z'
  },
  {
    nodeName: 'end-event',
    type: 'EndEvent',
    group: 'event',
    className: 'iconfont iconjieshushijian end',
    title: '结束',
    iconD: 'M320.223 320.223v384h383.11v-384h-383.11z m319.742 319.742h-255.89V381h255.89v258.965z'
  },
  {
    nodeName: 'exclusive-gateway',
    type: 'ExclusiveGateway',
    group: 'gateway',
    className: 'iconfont iconwenhao end',
    title: '创建判断节点',
    iconD: 'M455.408941 101.07482400000004h84.87153v84.871529h-84.87153v-84.871529z m130.168471 265.938823c-42.465882-28.310588-62.253176-62.223059-62.253177-99.026823v-25.449412H455.378824v31.111529c-2.831059 50.928941 22.648471 96.195765 67.915294 130.168471 50.898824 36.743529 76.378353 73.547294 70.716235 107.52-5.662118 50.898824-33.942588 79.209412-87.702588 82.04047-62.253176 2.831059-101.857882-33.972706-115.983059-110.351058l-76.408471 19.817411c22.648471 113.152 93.364706 166.912 206.546824 164.080941 99.026824-5.662118 149.955765-53.76 161.249882-147.124705 2.861176-56.591059-28.280471-107.52-96.165647-152.786824zM512 836.698353C263.017412 836.668235 59.331765 632.9825880000001 59.331765 384c0-249.012706 203.685647-452.728471 452.668235-452.728471S964.668235 135.01741200000004 964.668235 384 761.012706 836.668235 512 836.668235z m0-961.957647C231.905882-125.28941199999997 2.710588 103.90588200000002 2.710588 384 2.710588 664.094118 231.905882 893.289412 512 893.289412S1021.289412 664.094118 1021.289412 384 792.094118-125.28941199999997 512-125.28941199999997z'
  },
  {
    nodeName: 'branchNode',
    type: 'ServiceTask',
    group: 'activity',
    className: 'iconfont iconleixing-fenzhijiedian end',
    title: '创建分支节点',
    iconD: 'M252.032 415.7536a128 128 0 1 1 0-63.488A32.32 32.32 0 0 1 256 352.0096c75.648 0 140.16-51.392 249.6-180.672 81.408-96.256 86.912-102.528 118.912-132.41600001C674.24-7.414399989999993 719.744-31.990400000000022 768-31.990400000000022c1.34399999 0 2.688 0.064 3.968 0.256a128 128 0 1 1 0 63.488A32.32 32.32 0 0 1 768 32.00959999999998c-28.672 0-60.8 17.408-99.84 53.75999999-29.248 27.264-34.816 33.6-113.728 126.91200001-51.648 60.992-94.71999999 106.816-135.04 139.328L768 352.0096c1.34399999 0 2.688 0.064 3.968 0.256a128 128 0 1 1 0 63.488A32.32 32.32 0 0 1 768 416.0096L419.392 416.0096c40.32 32.512 83.392 78.336 135.04 139.328 78.912 93.312 84.48 99.648 113.728 126.91200001 39.04 36.352 71.168 53.76 99.84 53.75999999 1.34399999 0 2.688 0.064 3.968 0.256a128 128 0 1 1 0 63.488A32.32 32.32 0 0 1 768 800.00959999c-48.256 0-93.76-24.576-143.488-70.91199998-32-29.888-37.504-36.16-118.976-132.41600001C396.16 467.4016 331.648 416.0096 256 416.0096a32.32 32.32 0 0 1-3.968-0.256zM831.99999999 384.0096a64 64 0 1 0 128.00000001 0 64 64 0 0 0-128.00000001 0z m1e-8-384a64 64 0 1 0 128 0 64 64 0 0 0-128 0z m0 768a64 64 0 1 0 128 0 64 64 0 0 0-128 0zM64 384.0096a64 64 0 1 0 128.00000001 0 64 64 0 0 0-128.00000001 0z'
  },
  {
    nodeName: 'polymerizationNode',
    type: 'ServiceTask',
    group: 'activity',
    className: 'iconfont iconleixing-guibingjiedian end',
    title: '创建聚合节点',
    iconD: 'M771.968 415.7536a128 128 0 1 0 0-63.488A32.32 32.32 0 0 0 768 352.0096c-75.648 0-140.16-51.392-249.6-180.672-81.408-96.256-86.912-102.528-118.912-132.41600001C349.76-7.414399989999993 304.256-31.990400000000022 256-31.990400000000022c-1.34399999 0-2.688 0.064-3.968 0.256a128 128 0 1 0 0 63.488c1.28 0.192 2.624 0.256 3.968 0.256 28.672 0 60.8 17.408 99.84 53.75999999 29.248 27.264 34.816 33.6 113.728 126.91200001 51.648 60.992 94.71999999 106.816 135.04 139.328L256 352.0096c-1.34399999 0-2.688 0.064-3.968 0.256a128 128 0 1 0 0 63.488c1.28 0.192 2.624 0.256 3.968 0.256l348.608 0c-40.32 32.512-83.392 78.336-135.04 139.328-78.912 93.312-84.48 99.648-113.728 126.91200001-39.04 36.352-71.168 53.76-99.84 53.75999999-1.34399999 0-2.688 0.064-3.968 0.256a128 128 0 1 0 0 63.488c1.28 0.192 2.624 0.256 3.968 0.25599999 48.256 0 93.76-24.576 143.488-70.91199998 32-29.888 37.504-36.16 118.976-132.41600001C627.84 467.4016 692.352 416.0096 768 416.0096a32.32 32.32 0 0 0 3.968-0.256zM192.00000001 384.0096a64 64 0 1 1-128.00000001 0 64 64 0 0 1 128.00000001 0zM192 0.009599999999977626a64 64 0 1 1-128 0 64 64 0 0 1 128 0z m0 768a64 64 0 1 1-128 0 64 64 0 0 1 128 0zM960 384.0096a64 64 0 1 1-128.00000001 0 64 64 0 0 1 128.00000001 0z'
  },
  {
    nodeName: 'jointlySignNode',
    type: 'UserTask',
    group: 'activity',
    className: 'iconfont iconhuiqianrenwu end',
    title: '创建会签节点',
    iconD: 'M837.376 858.368H186.56a179.84 179.84 0 0 1-179.584-179.776v-242.24c0-12.608 10.176-22.72 22.72-22.72 12.672 0 32.896 10.112 32.896 22.72v242.24c0 58.944 62.656 118.912 123.904 120.256h650.944c56.64-1.344 126.464-65.344 123.84-120.256v-242.24c0-12.608 20.352-22.72 32.96-22.72a22.656 22.656 0 0 1 22.72 22.72v242.24a179.84 179.84 0 0 1-179.584 179.776zM859.968 181.12a25.344 25.344 0 0 1 1.472-35.52c39.04-35.968 61.44-86.784 61.44-139.776a25.152 25.152 0 1 1 50.304 0 240.448 240.448 0 0 1-77.696 176.832 25.344 25.344 0 0 1-35.52-1.536zM296.768 199.68a24.704 24.704 0 0 1 12.352 19.968 25.152 25.152 0 0 1-23.936 26.304 110.208 110.208 0 0 0-105.024 110.208c0 48.768 32.768 92.416 79.552 106.048a25.152 25.152 0 1 1-13.888 48.32 161.664 161.664 0 0 1-115.904-154.432 160.64 160.64 0 0 1 66.176-130.048 238.72 238.72 0 0 1-145.408-220.352 25.216 25.216 0 0 1 50.432 0 188.8 188.8 0 0 0 182.72 189.376 23.296 23.296 0 0 1 12.928 4.608zM778.304 510.464a25.024 25.024 0 0 1-31.232-17.088 25.28 25.28 0 0 1 17.088-31.232 110.912 110.912 0 0 0 79.616-106.048 110.08 110.08 0 0 0-105.088-110.08 25.344 25.344 0 0 1-23.936-26.432 25.152 25.152 0 0 1 25.216-23.808h1.088a160.32 160.32 0 0 1 153.088 160.32 161.408 161.408 0 0 1-115.84 154.368zM511.936 587.968a200.576 200.576 0 0 1-200.192-200.384c0-71.616 37.824-134.272 94.144-169.856a302.976 302.976 0 0 1-196.288-283.072c0-13.888 11.2-25.088 25.088-25.088a24.96 24.96 0 0 1 25.152 25.088 252.608 252.608 0 0 0 252.288 252.48 200.576 200.576 0 0 1 200.192 200.384 200.704 200.704 0 0 1-200.384 200.448z m0-350.528a150.08 150.08 0 1 0 150.08 150.144 150.336 150.336 0 0 0-150.08-150.144zM680.832 156.288a25.152 25.152 0 0 1 1.664-35.52 253.632 253.632 0 0 0 81.664-186.112c0-13.888 11.136-25.088 25.216-25.088a25.024 25.024 0 0 1 25.024 25.088 303.36 303.36 0 0 1-97.984 223.104 25.216 25.216 0 0 1-35.584-1.472z'
  },
  {
    nodeName: 'fixedPersonNode',
    type: 'UserTask',
    group: 'activity',
    className: 'iconfont iconrenshu end',
    title: '创建固定人节点',
    iconD: 'M209.85222231-87.64030699A60.740084 60.740084 0 0 0 149.74254331-19.87728899000001a400.362535 400.362535 0 0 0 166.64814 327.191304 453.935908 453.935908 0 0 0 54.115301 32.438214 271.11843 271.11843 0 0 0-64.909605 75.991463 280.718283 280.718283 0 0 0-36.110047 165.542166A274.491651 274.491651 0 0 0 498.96484731 829.57698801 328.109263 328.109263 0 0 0 536.96610931 831.99907101a260.788635 260.788635 0 0 0 101.638997-20.327799 273.617931 273.617931 0 0 0 107.44536-82.284455 279.667608 279.667608 0 0 0 55.630484-125.848765 295.505154 295.505154 0 0 0-13.747255-149.074215 258.797882 258.797882 0 0 0-79.342564-112.289526 295.825886 295.825886 0 0 0 85.159987-59.059004l1.846976-1.448825a391.127653 391.127653 0 0 0 91.430859-131.168499 427.160281 427.160281 0 0 0 37.315557-170.319974 65.838623 65.838623 0 0 0-20.571113-49.857301 71.8883 71.8883 0 0 0-49.768824-17.905717z m-0.81842 60.021201h644.782756c11.955577 0 11.955577 3.38428 11.955577 7.741817a369.27361 369.27361 0 0 1-108.772528 256.530635l-1.891216 1.448826a223.406718 223.406718 0 0 1-111.028715 62.929912 9.876347 9.876347 0 0 0-3.682893 0.962197 268.552571 268.552571 0 0 0-98.741345-17.905717 350.372517 350.372517 0 0 0-106.250908 17.385909 323.762786 323.762786 0 0 1-85.712974-43.56431 339.954243 339.954243 0 0 1-141.564653-277.820631 25.061368 25.061368 0 0 1 0.917958-7.741817z m237.563183 388.672391a298.347507 298.347507 0 0 1 95.246468-16.94352 206.695453 206.695453 0 0 1 96.275024 22.749883 198.024618 198.024618 0 0 1 94.7709 108.385437 232.309808 232.309808 0 0 1 11.059738 118.095888 219.447332 219.447332 0 0 1-43.575369 98.254717 205.501002 205.501002 0 0 1-315.57858 13.072611 219.215077 219.215077 0 0 1-29.042873-257.979461 214.780122 214.780122 0 0 1 90.811513-85.668734z m0 0'
  },
  {
    nodeName: 'candidateNode',
    type: 'UserTask',
    group: 'activity',
    className: 'iconfont iconrenqun end',
    title: '创建候选节点',
    iconD: 'M736 364.8l-25.6-44.8c83.2-44.8 128-134.4 128-224l51.2 0C889.6 204.8 832 307.2 736 364.8zM505.6 768C390.4 768 300.8 672 300.8 556.8c0-76.8 38.4-140.8 96-179.2C281.6 339.2 192 224 192 89.6l51.2 0c0 140.8 121.6 262.4 268.8 262.4 115.2 0 211.2 96 211.2 211.2S620.8 768 505.6 768zM505.6 403.2c-83.2 0-153.6 70.4-153.6 153.6 0 83.2 70.4 153.6 153.6 153.6 83.2 0 153.6-70.4 153.6-153.6C665.6 473.6 595.2 403.2 505.6 403.2zM883.2 531.2c0 89.6-70.4 166.4-166.4 166.4 6.4-12.8 19.2-32 25.6-44.8 57.6-12.8 96-64 96-121.6 0-70.4-57.6-128-128-128-12.8-19.2-25.6-32-38.4-44.8 12.8 0 25.6 6.4 38.4 6.4C806.4 364.8 883.2 441.6 883.2 531.2zM902.4 377.6l-19.2-38.4c64-38.4 102.4-108.8 102.4-179.2L1024 160C1024 249.6 979.2 332.8 902.4 377.6zM0 160l44.8 0c0 76.8 38.4 147.2 102.4 179.2L121.6 377.6C44.8 332.8 0 249.6 0 160zM345.6 364.8C332.8 377.6 320 390.4 307.2 409.6c-70.4 0-128 57.6-128 128 0 57.6 44.8 108.8 96 121.6C288 672 294.4 684.8 300.8 704c-89.6 0-166.4-76.8-166.4-166.4 0-89.6 76.8-166.4 166.4-166.4C320 364.8 332.8 364.8 345.6 364.8z'
  },
  {
    nodeName: 'testAdd',
    type: 'ServiceTask',
    group: 'activity',
    className: 'iconfont iconicon- end',
    title: '测试新增',
    iconD: 'M128 768v-768h768V768z m704-704H192V704h640zM517.12 580.64l-45.28 45.28-100.64-100.64-60.64 60.48-45.12-45.28 105.76-105.76 145.92 145.92zM692.8 309.44000000000005l-47.36-47.52-48.48 48.48-45.28-45.28 48.48-48.32-51.36-51.52 45.12-45.28 51.52 51.52 50.4-50.56 45.28 45.28-50.4 50.56 47.36 47.36-45.28 45.28zM297.456 214.64l384 383.984 45.248-45.264-384-383.984z'
  }
]