'use strict';

angular.module('givitApp')
  .service('GivitList', function () {
    this.isSearchShown = false;
    this.items = [{
      ItemName: 'Bike - Adult',
      GUID: '18455637-f4e9-444e-85aa-ea674125f32a',
      Recipient: 'A former homeless gentleman in his 40s with multiple medical issues, had his bike accidentally run over. He would appreciate another, as this was his only form of transport.',
      DeliveryMethods: ['drop-off', 'pick-up'],
      Location: 'Moorooka, QLD 4173'
    }, {
      ItemName: 'Portable Dehumidifier',
      GUID: '8f6c868a-f0b8-41dd-ac56-42da747be7a9',
      Recipient: 'We are assisting a lady with mental health issues who is attending a community based rehabilitation service. There she will gain the skills to live independently. Her future accommodation is quite damp & this donation will help with this problem',
      DeliveryMethods: ['drop-off', 'pick-up'],
      Location: 'Upper, QLD Mt Gravatt 4122'
    }, {
      ItemName: 'Laptop Computer - Lightweight',
      GUID: 'b73f137c-1c7a-40be-95eb-7c6ac6dc9132',
      Recipient: 'Our client is a 22 y.o. young lady who has spent the majority of her adolescence & adulthood in hospital. She is due to leave hospital & would like to link in with her community.\n\nShe suffers high social anxiety & having a lightweight laptop would support our work in gradual social access & interaction as well as assisting her to self- manage & self-soothe when she becomes anxious.',
      DeliveryMethods: ['drop-off', 'pick-up'],
      Location: 'Fortitude, QLD Valley 4006'
    }, {
      ItemName: 'Baby Monitor',
      GUID: '38de1ba0-44d3-4316-9c21-eeb9ce69b04f',
      Recipient: 'Our client is a young mum-to-be who was previously homeless. Due to the layout of her accommodation she would appreciate a baby monitor to use as reassurance that her baby is ok.',
      DeliveryMethods: ['drop-off', 'post'],
      Location: 'Camp, QLD Hill 4152'
    }, {
      ItemName: 'Bedside Table',
      GUID: '8d41715e-467e-4bcc-a89c-a7e72785ae31',
      Recipient: 'A young woman with a disability has just moved into an independent living unit. She has very little furniture & limited funds & would appreciate some bedside tables for her personal items.\n\nPICK UP INFO: Can collect from Brisbane northern or inner southern suburbs.',
      DeliveryMethods: ['drop-off', 'pick-up'],
      Location: 'Clayfield, QLD 4011'
    }, {
      ItemName: 'Chest of Drawers',
      GUID: '98c85957-20fc-4df9-8e43-90cbf2326202',
      Recipient: 'A young woman with a disability has just moved into an independent living unit. The unit has a small wardrobe but nowhere else to store the rest of her clothes. She would appreciate a chest of drawers\n\nPICK UP INFO: Can collect from Brisbane northern or inner southern suburbs.',
      DeliveryMethods: ['drop-off', 'pick-up'],
      Location: 'Clayfield, QLD 4011'
    }, {
      ItemName: 'Fridge/Freezer - Small',
      GUID: '237999f6-b20a-42ea-906a-0710fd548133',
      Recipient: 'Two of our clients are living independently in a unit. They have a small bar fridge, however it is only big enough for a couple of days worth of groceries. They would appreciate a small fridge/freezer\n\nPICK UP INFO: Can collect from Brisbane northern or inner southern suburbs.',
      DeliveryMethods: ['pick-up'],
      Location: 'Clayfield, QLD 4011'
    }];
  });