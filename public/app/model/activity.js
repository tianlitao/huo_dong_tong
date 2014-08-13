/**
 * Created by tlt on 14-7-16.
 */
function Activity(name) {
    this.name = name;
    this.user = localStorage.user;
    this.activity_status = 'false';
    this.apply_list = [];
    this.bid_status = 'false';
    this.bid_list = []
}
Activity.check_activity_list_exist = function () {
    var activities = JSON.parse(localStorage.getItem("activities")) || [];

    return( _.filter(activities, function (act) {
        return act.user == localStorage.user
    }))

}
Activity.prototype.save_message = function () {
    var activities = JSON.parse(localStorage.getItem("activities")) || [];

    activities.unshift(this)
    localStorage.setItem("activities", JSON.stringify(activities))
}
Activity.save_current_activity = function () {
    var activities = JSON.parse(localStorage.getItem('activities'))
    var act = _.filter(activities, function (act) {
        return act.user == localStorage.user
    })
    localStorage.current_activity = act[0].name
}
Activity.save_click_activity = function (activity) {
    var activities = JSON.parse(localStorage.getItem('activities'))

    localStorage.current_activity = activity
}
Activity.get_activities = function () {
    var activities = JSON.parse(localStorage.getItem('activities'))
    return( _.filter(activities, function (act) {
        return act.user == localStorage.user
    }))

}
Activity.check_rename = function ($scope) {
    var activities = JSON.parse(localStorage.getItem("activities")) || [];
    var act = _.filter(activities, function (act) {
        return act.user == localStorage.user
    })
    return(_.find(act, function (act) {
        return act.name == $scope.activity
    }))
}
Activity.judge_check_rename = function ($scope) {
    var activity = new Activity($scope.activity);
    if (Activity.check_rename($scope)) {
        $scope.hide = 1
    }

    if (!Activity.check_rename($scope)) {
        activity.save_message()
        Activity.save_current_activity()
        //  $location.path('bidding')
    }
}
Activity.localstorage_clear = function () {
    localStorage.bid = ""
    localStorage.bid_price = "[]"
    localStorage.current_activity = ""
    localStorage.status = ""
}
Activity.post_message = function () {
    var action = Activity.check_activity_list_exist()
    var post = []
    for (var i in action) {
        var act = {"user": localStorage.user, "name": action[i].name, "number": action[i].apply_list.length, "bid": action[i].bid_list.length}
        post.unshift(act)
    }
    return post
}
Activity.activity_message = function () {
    var action = Activity.check_activity_list_exist()
    var activity = []
    for (var i in action) {
        for (var j in action[i].apply_list) {
            var act = {"user": localStorage.user, "name": action[i].name, "apply_name": action[i].apply_list[j].apply_name, "apply_phone": action[i].apply_list[j].apply_phone}
            activity.push(act)
        }
    }
    return activity
}
Activity.post_bid = function () {
    var action = Activity.check_activity_list_exist()
    var bid = []
    for (var i in action) {
        for (var j in action[i].bid_list) {
            var bidding = {"user": localStorage.user, "name": action[i].name, "bid_name": action[i].bid_list[j].bid_name, "bid_num": action[i].bid_list[j].bid_message.length, "apply_num": action[i].apply_list.length}
            bid.push(bidding)
        }
    }
    return bid
}
Activity.post_bid_list = function () {
    var action = Activity.check_activity_list_exist()
    var bid_list = []
    for (var i in action) {
        for (var j in action[i].bid_list) {
            for (var z in action[i].bid_list[j].bid_message) {
                var bid = {"user": localStorage.user, "name": action[i].name, "bid_name": action[i].bid_list[j].bid_name, "apply_name": action[i].bid_list[j].bid_message[z].bid_name, "bid_phone": action[i].bid_list[j].bid_message[z].bid_phone, "bid_price": action[i].bid_list[j].bid_message[z].bid_price}
                bid_list.push(bid)
            }
        }
    }
    return bid_list
}
Activity.price_coutn=function(){
    var action = Activity.check_activity_list_exist()
    var price_count=[]
    for(var i in action){
        for (var j in action[i].bid_list)
        var bidding={"user":localStorage.user,"name":action[i]}
    }
}
