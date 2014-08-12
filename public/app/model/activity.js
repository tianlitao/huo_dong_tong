/**
 * Created by tlt on 14-7-16.
 */
function Activity (name){
    this.name=name;
    this.user=localStorage.user;
    this.activity_status='false';
    this.apply_list=[];
    this.bid_status='false';
    this.bid_list=[]
}
Activity.check_activity_list_exist=function(){
    var activities = JSON.parse(localStorage.getItem("activities")) || [];

   return( _.filter(activities,function(act){return act.user==localStorage.user}))

}
Activity.prototype.save_message=function(){
    var activities = JSON.parse(localStorage.getItem("activities")) || [];

    activities.unshift(this)
    localStorage.setItem("activities", JSON.stringify(activities))
}
Activity.save_current_activity=function(){
    var activities = JSON.parse(localStorage.getItem('activities'))
    var act= _.filter(activities,function(act){return act.user==localStorage.user})
    localStorage.current_activity = act[0].name
}
Activity.save_click_activity=function(activity){
    var activities = JSON.parse(localStorage.getItem('activities'))

    localStorage.current_activity = activity
}
Activity.get_activities=function(){
    var activities = JSON.parse(localStorage.getItem('activities'))
   return( _.filter(activities,function(act){return act.user==localStorage.user}))

}
Activity.check_rename=function($scope){
    var activities = JSON.parse(localStorage.getItem("activities")) || [];
    var act= _.filter(activities,function(act){return act.user==localStorage.user})
    return(_.find(act, function (act) {
        return act.name == $scope.activity
    }))
}
Activity.judge_check_rename=function($scope){
    var activity = new Activity($scope.activity);
    if(Activity.check_rename($scope)){
        $scope.hide = 1
    }

    if(!Activity.check_rename($scope)){
        activity.save_message()
        Activity.save_current_activity()
      //  $location.path('bidding')
    }
}
Activity.localstorage_clear=function(){
    localStorage.bid=""
    localStorage.bid_price="[]"
    localStorage.current_activity=""
    localStorage.status=""
}




