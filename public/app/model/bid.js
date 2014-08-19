/**
 * Created by tlt on 14-7-18.
 */
function Bid(bid_name) {
    this.bid_name = bid_name;
    this.bid_phone = 'bid_phone';
    this.bid_price = 'bid_price';

}
Bid.activity_current_activity = function () {
    var action = JSON.parse(localStorage.getItem("activities"))
    var act = _.filter(action, function (act) {
        return act.user == localStorage.user
    })
    return(  _.find(act, function (act) {
        return act.name == localStorage.current_activity
    }))
}
Bid.get_apply_list = function (apply) {
    var action = JSON.parse(localStorage.getItem("activities"))
    var act = _.filter(action, function (act) {
        return act.user == localStorage.user
    })
    return _.findWhere(act, {name: apply}).apply_list
}
Bid.check_crruent_activity = function () {
    var action = JSON.parse(localStorage.getItem("activities"))
    var act = _.filter(action, function (act) {
        return act.user == localStorage.user
    })
    return _.findWhere(act, {name: localStorage.current_activity}).bid_list
}
Bid.check_current_activity_bid = function () {
    var act = Bid.check_crruent_activity()
    if (act.length == 0) {
        return []
    } else {
        return _.findWhere(act, {bid_name: localStorage.bid}).bid_message
    }
}
Bid.get_current_activity = function (action) {
    localStorage.setItem('activities', JSON.stringify(action))
}
Bid.save_activity_status = function (status) {
    var action = JSON.parse(localStorage.getItem("activities"));
    var act = _.filter(action, function (act) {
        return act.user == localStorage.user
    })
    _.findWhere(act, {name: status}).activity_status = "true"
    localStorage.setItem('activities', JSON.stringify(action))
}
Bid.save_activity_status_false = function (status) {
    var action = JSON.parse(localStorage.getItem("activities"));
    var act = _.filter(action, function (act) {
        return act.user == localStorage.user
    })
    _.findWhere(act, {name: status}).activity_status = "false"
    localStorage.setItem('activities', JSON.stringify(action))
}
Bid.save_bid_status_bid_message = function () {
    var action = JSON.parse(localStorage.getItem("activities"));
    var act = _.filter(action, function (act) {
        return act.user == localStorage.user
    })
    _.findWhere(act, {name: localStorage.current_activity}).bid_status = "true"
    localStorage.setItem('activities', JSON.stringify(action))
    var bid = JSON.parse(localStorage.getItem("activities"));
    var bidding = _.find(bid, function (bid) {
        return bid.name == localStorage.current_activity
    })
    localStorage.bid = "竞价" + (bidding.bid_list.length + 1)
    var bid_name = "竞价" + (bidding.bid_list.length + 1)
    var bid_list = {'bid_name': bid_name, 'bid_color': 'true', 'bid_message': []}
    bidding.bid_list.unshift(bid_list)
    localStorage.setItem('activities', JSON.stringify(bid))
}
Bid.check_current_activity_activity_status = function () {
    var action = JSON.parse(localStorage.getItem("activities"))
    var act = _.filter(action, function (act) {
        return act.user == localStorage.user
    })
    return(  _.find(act, function (act) {
        return act.name == localStorage.current_activity && act.activity_status == 'true'
    }))
}
Bid.check_bid_status = function () {
    var action = JSON.parse(localStorage.getItem("activities"))
    var act = _.filter(action, function (act) {
        return act.user == localStorage.user
    })
    return(_.find(act, function (action) {
        return action.bid_status == 'true'
    }))
}
Bid.check_activity_status = function () {
    var action = JSON.parse(localStorage.getItem("activities"))
    var act = _.filter(action, function (act) {
        return act.user == localStorage.user
    })
    return (_.find(act, function (action) {
        return action.activity_status == 'true'
    }))
}
Bid.check_current_activity_bid_list = function () {
    var action = JSON.parse(localStorage.getItem("activities"))
    var act = _.filter(action, function (act) {
        return act.user == localStorage.user
    })
    return ( _.findWhere(act, {name: localStorage.current_activity}).bid_list)
}
Bid.check_current_activity = function () {
    var action = JSON.parse(localStorage.getItem("activities"))
    var act = _.filter(action, function (act) {
        return act.user == localStorage.user
    })
    return(_.find(act, function (bidding) {
        return bidding.name == localStorage.current_activity
    }))
}
Bid.check_activity_status_length = function () {
    var action = JSON.parse(localStorage.getItem("activities"))
    var act = _.filter(action, function (act) {
        return act.user == localStorage.user
    })
    var bidding = Bid.check_current_activity()
    return(  _.find(act, function (bid) {
        return bid.activity_status == 'true' || bidding.length == 0
    }))
}
Bid.check_current_bid = function () {
    var action = JSON.parse(localStorage.getItem("activities"))
    var act = _.filter(action, function (act) {
        return act.user == localStorage.user
    })
    return(_.find(act, function (action) {
        return action.bid_list[0].bid_name == localStorage.bid
    }))
}
Bid.refresh = function () {
    var refresh_page = document.getElementById('id')
    if (refresh_page) {
        var scope = angular.element(refresh_page).scope();
        scope.$apply(function () {
            scope.refreshes();
        })
    }
}
Bid.save_bid_status = function () {
    var action = JSON.parse(localStorage.getItem("activities"));
    var act = _.filter(action, function (act) {
        return act.user == localStorage.user
    })
    _.findWhere(act, {name: localStorage.current_activity}).bid_status = "false"
    localStorage.setItem('activities', JSON.stringify(action))

}
Bid.check_bid_price_bid_count = function () {
    var bid_price = JSON.parse(localStorage.getItem("bid_price"))
    return (_.find(bid_price, function (bid) {
        return bid.count == 1
    }))
}
Bid.check_bid_messages_bid_price = function () {
    var bidding = Bid.check_current_activity()
    var bids = Bid.check_bid_price_bid_count()
    var bid_message = bidding.bid_list[0].bid_message
    if(bids){
        return (_.find(bid_message, function (bid) {
            return bid.bid_price == bids.price
        }))
    }else{
        return []
    }

}
Bid.save_bid_price = function () {
    var bidding = Bid.check_current_activity_bid()
    var count = _.countBy(bidding, function (bidding) {
        return bidding.bid_price
    })
    var coun = _.map(count, function (value, key) {
        return {"price": key, "count": value}
    })
    localStorage.setItem("bid_price", JSON.stringify(coun))
}
Bid.display_sortby = function () {
    var bidding = Bid.check_current_activity_bid()
    return(_.sortBy(bidding, function (bidding) {
        return bidding.bid_price
    }))
}
Bid.check_current_activity_save_bid_color = function () {
    Bid.refresh()
    Bid.save_bid_status()
    localStorage.status = false
    var bidding = JSON.parse(localStorage.getItem("activities"))
    var act = _.filter(bidding, function (act) {
        return act.user == localStorage.user
    })
    var bid = _.findWhere(act, {name: localStorage.current_activity}).bid_list
    _.findWhere(bid, {bid_name: localStorage.bid}).bid_color = "false"
    localStorage.setItem("activities", JSON.stringify(bidding))
}
Bid.check_bid_start = function ($scope) {
    if (Bid.check_current_activity() && Bid.check_bid_status() && Bid.check_current_bid()) {
        $scope.bid_start = false
    }
}
Bid.current_display_bid_messages = function ($scope) {
    if (Bid.check_bid_price_bid_count() && Bid.activity_current_activity() && Bid.check_bid_messages_bid_price()) {
        $scope.success = "true"
        $scope.fail = "false"
        $scope.bid_name = Bid.check_bid_messages_bid_price().bid_name
        $scope.price = Bid.check_bid_messages_bid_price().bid_price
        $scope.phone = Bid.check_bid_messages_bid_price().bid_phone
    }
}
Bid.judge_check_bid_price_bid_count = function ($scope) {
    if (!Bid.check_bid_price_bid_count()) {
        $scope.success = "false"
        $scope.fail = "true"
    }
}
Bid.judege_check_current_activity_activity_status = function ($scope) {
    if (Bid.check_current_activity_activity_status()) {
        $scope.apply_status = "1"
    }
}
Bid.judge_check_bid_status_activity_status = function ($scope) {

    if (Bid.check_bid_status()) {
        $scope.disabled = true
        return
    }
    if (Bid.check_bid_status() && Bid.check_activity_status()) {
        $scope.disabled = true
        return
    }
    if (Bid.check_bid_status() && !Bid.check_activity_status()) {
        $scope.disabled = false
        return
    }
}
Bid.judge_check_bid_status = function ($scope) {
    if (Bid.check_bid_status()) {
        $scope.bid_start = true
    }
}
Bid.judge_check_activity_status_length = function ($scope) {
    if (Bid.check_activity_status_length()) {
        $scope.bid_start = true
    }
}
Bid.judge_check_bid_price_bid_count_current_activity_bid_messages_bid_price = function ($scope) {
    if (Bid.check_bid_price_bid_count() && Bid.check_current_activity() && Bid.check_bid_messages_bid_price()) {
        var bid_messages = Bid.check_bid_messages_bid_price()
        $scope.success = "true"
        $scope.fail = "false"
        $scope.bid_name = bid_messages.bid_name
        $scope.price = bid_messages.bid_price
        $scope.phone = bid_messages.bid_phone
    } else {
        $scope.success = "false"
        $scope.fail = "true"
    }
}
Bid.timeout = function ($timeout) {
    $('#ModalSuccess').modal("show");
    $timeout(function () {
        $('#ModalSuccess').modal('hide');
    }, 3000)
}










