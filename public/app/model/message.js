/**
 * Created by tlt on 14-7-20.
 */
function Message() {

}
Message.check_message_j = function (json_message) {
    var act_list = JSON.parse(localStorage.getItem("activities"));
    var act= _.filter(act_list,function(act){return act.user==localStorage.user})
    var message = json_message.messages[0].message.replace(/\s/g, "");
    return( _.find(act, function (act) {
        return act.bid_status == 'true' && message.search(/jj/i) == 0
    }))
}
Message.check_status=function(json_message){
    var message = json_message.messages[0].message.replace(/\s/g, "");
    var act_list = JSON.parse(localStorage.getItem("activities"));
  var act=  _.filter(act_list,function(act){return act.user==localStorage.user})

    return(_.find(act, function (act) {
        return act.activity_status == 'true' && message.search(/bm/i) == 0
    }))
}
Message.check_activity_status_bm = function (json_message) {
    var act_list = JSON.parse(localStorage.getItem("activities"));
    var message = json_message.messages[0].message.replace(/\s/g, "");
    var apply_phone = json_message.messages[0].phone
    if (message.search(/bm/i) == 0) {
        var action= _.filter(act_list,function(act){return act.user==localStorage.user})
        var act = _.findWhere(action, {activity_status: 'true'}).apply_list
        return( _.find(act, function (act){
            return act.apply_phone == apply_phone
        }))

    }
}
Message.save_message = function (json_message) {
    var act_list = JSON.parse(localStorage.getItem("activities"));
    var act= _.filter(act_list,function(act){return act.user==localStorage.user})
    var message = json_message.messages[0].message.replace(/\s/g, "");
    var apply_name = message.substr(2).trim()
    var apply_phone = json_message.messages[0].phone
    var apply_array = {'apply_name': apply_name, 'apply_phone': apply_phone}
    _.findWhere(act, {activity_status: 'true'}).apply_list.push(apply_array)
    localStorage.setItem("activities", JSON.stringify(act_list))

}
Message.check_activity_status = function (json_message) {
    var act_list = JSON.parse(localStorage.getItem("activities"));
    var act= _.filter(act_list,function(act){return act.user==localStorage.user})
    var message = json_message.messages[0].message.replace(/\s/g, "");
    return(_.find(act, function (act) {
        return act.activity_status == 'true' && message.search(/bm/i) == 0
    }))
}
Message.refresh = function () {
    var refresh_page = document.getElementById('sign_up_page_id')
    if (refresh_page) {
        var scope = angular.element(refresh_page).scope();
        scope.$apply(function () {
            scope.diaoyong();
        })
    }
}
Message.check_message_jj = function (json_message) {
    var act_list = JSON.parse(localStorage.getItem("activities"));
    var act= _.filter(act_list,function(act){return act.user==localStorage.user})
    var message = json_message.messages[0].message.replace(/\s/g, "");
    return( _.find(act, function (act) {
        return act.bid_status == 'true' && message.search(/jj/i) == 0
    }))
}
Message.check_message_phone = function (json_message) {
    var activity = Message.check_message_jj(json_message)
    var bid_phone = json_message.messages[0].phone
    var act = activity.apply_list
    return(_.find(act, function (apply) {
        return apply.apply_phone == bid_phone
    }))
}
Message.refresh_bid=function(){
    var refresh_page = document.getElementById('page_id')
    if (refresh_page) {
        var scope = angular.element(refresh_page).scope();
        scope.$apply(function () {
            scope.break();
        })
    }
}
Message.save_bid_message=function(json_message){
    var act_list = JSON.parse(localStorage.getItem("activities"));
    var message = json_message.messages[0].message.replace(/\s/g, "");
    var act= _.filter(act_list,function(act){return act.user==localStorage.user})
    var activity= _.find(act, function (act) {
        return act.bid_status == 'true' && message.search(/jj/i) == 0
    })
    var bid_price = message.substr(2)
    var bid_phone = json_message.messages[0].phone
    var even=Message.check_message_phone(json_message)
    var bid_name = even.apply_name
    var bid_message = {'bid_price': bid_price, 'bid_phone': bid_phone, 'bid_name': bid_name} || []
    activity.bid_list[0].bid_message.push(bid_message)
    localStorage.setItem('activities', JSON.stringify(act_list))
}
Message.check_bid_phone=function(json_message){
    var activity=Message.check_message_jj(json_message)
    var bid_phone = json_message.messages[0].phone
    var bid = activity.bid_list[0].bid_message
    return( _.find(bid, function (bid) {
        return bid.bid_phone == bid_phone
    }))
}
























