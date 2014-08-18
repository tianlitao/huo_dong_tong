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
            var bidding = {"user": localStorage.user, "name": action[i].name, "bid_name": action[i].bid_list[j].bid_name, "bid_num": action[i].bid_list[j].bid_message.length, "apply_num": action[i].apply_list.length, "status": action[i].bid_list[j].bid_color}
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
                var bid = {"user": localStorage.user, "name": action[i].name, "bid_name": action[i].bid_list[j].bid_name, "apply_name": action[i].bid_list[j].bid_message[z].bid_name, "bid_phone": action[i].bid_list[j].bid_message[z].bid_phone, "bid_price": parseInt(action[i].bid_list[j].bid_message[z].bid_price)}
                bid_list.push(bid)
            }
        }
    }

    return _.sortBy(bid_list, function (bidding) {
        return bidding.bid_price
    })

}
Activity.price_count = function () {
    var action = Activity.check_activity_list_exist()
    var price_count = []
    for (var i in action) {
        for (var j in action[i].bid_list) {

            var bidding = action[i].bid_list[j].bid_message
            var count = _.countBy(bidding, function (bidding) {
                return bidding.bid_price
            })
            var coun = _.map(count, function (value, key) {
                return {"price": key, "count": value}
            })
            for (var z in coun) {
                if (coun != []) {
                    var bid = {"user": localStorage.user, "name": action[i].name, "bid_name": action[i].bid_list[j].bid_name, "price": coun[z].price, "count": coun[z].count}
                    price_count.push(bid)
                }
            }
        }
    }
    return price_count
}
Activity.message_display = function () {
    var display = []
    Bid.save_bid_price()
    var count = JSON.parse(localStorage.getItem("bid_price"))
    var bidding = Bid.check_current_activity_bid()
    var a = _.filter(count, function (count) {
        return count.count == "1"
    })
    var b = _.sortBy(a, function (a) {
        return a.price
    })
    console.log(count)
    for (var i in b) {
        for (var j in bidding) {
            if (b[i].price == bidding[j].bid_price) {
                console.log(111111111111)
                var bid = {"user": localStorage.user, "bid_name": bidding[j].bid_name, "bid_phone": bidding[j].bid_phone}
                display.push(bid)
            }
        }
    }
    return display
}
Activity.display_success = function () {
    var a = Bid.check_bid_messages_bid_price()
    var b = []
    b.push({"user": localStorage.user, "bid_name": a.bid_name, "bid_price": a.bid_price, "bid_phone": a.bid_phone, "success_status": "true"})
    return b
}
