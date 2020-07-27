let transactions = [
    {user_id:1, amount:400, created:'2020-07-27T18:21:49.712Z'}
]


function getRewardsByUserAndMonth(user, month) {
    let userRewad = {};
    let users = [];
    if (user) {
        users= [user];
    } else {
        users = transactions.map(tran => tran.user_id)
        .filter((value, index, self) => self.indexOf(value) === index);          
    }

    users.forEach((user)=>{

        transactions.filter((tran)=> tran.user_id === user).filter((tran)=> {if (month) { return new Date(tran.created).getMonth() === month } else return true}).forEach((tran) => {
            if(!userRewad[user]) userRewad[user] = {}
            let mon = new Date(tran.created).getMonth();
            let reward = (tran.amount>100?(tran.amount - 100) *2: 0 )+ (tran.amount>50 ? (tran.amount-50 < 50?tran.amount-50:50) :0)
            console.log('reward>>>>>>>>>>>', reward, mon);
            if(!userRewad[user][mon]){
                //console.log ('if>>>>>>>>>>>');
                userRewad[user][mon] = reward;
            } 
            else {
                //console.log ('else>>>>>>>>>>>');
                userRewad[user][mon] += reward;
            }
            
        })
    })

    console.log(JSON.stringify(userRewad))
    Object.keys(userRewad).forEach((user)=> {
        //console.log(Object.keys(user))
        Object.keys(userRewad[user]).forEach((mon) => {
            console.log('user:', user, '  Month:', mon, ' Rewards: ', userRewad[user][mon])
        });
    })
    
}
getRewardsByUserAndMonth()
