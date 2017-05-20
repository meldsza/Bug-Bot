var config = {
  botToken: '',
  trelloKey: '',
  trelloToken: '',

  prefix: '!',
  reportStartID: 1000,
  minApprovals: 3,

  iosChannel: '202491590390841344',               //ios text Channel
  androidChannel: '232568032394870784',           //android text Channel
  canaryChannel: '197038744908333066',            //canary text Channel
  linuxChannel: '238073742624948225',             //linux text Channel
  modLogChannel: "241625778368806912",            //mod log text Channel
  bugHunterChannel: '217764019661045761',         //bug hunter text Channel
  bugApprovalChannel: '253923313460445184',       //bug approval text channel

  devRole: '197042389569765376',                  //dev role
  hunterRole: '197042209038663680',               //bug hunter role
  adminRole: '197042322939052032',                //admin role
  linuxTesterRole: '278229255169638410',          //linux role
  androidAlphaRole: '234838349800538112',         //android alpha role
  iosTestflightRole: '234838392464998402',        //ios testflight role
  trelloModRole: '197400761104203776',            //trello mod role

  iosCard: '57fd4af58042f56c271d46b3',            //ios user report card
  androidCard: '57f2a30d861fa9b5816c9717',        //android user report card
  canaryCard: '5771677fda45a436c5b8d255',         //canary user report card
  linuxCard: '5846f9f1c7b3c505ea4a56be',          //linux user report card

  botID: '240545475118235648',                    //bot's user ID
  DTserverID: '197038439483310086',               //Discord Testers srver ID
  delayInMS: 15000,                               //delay in ms for the bot to remove messages
  minuteDelay: 60000                              //one minute delay for bug queue
}
module.exports = config;
