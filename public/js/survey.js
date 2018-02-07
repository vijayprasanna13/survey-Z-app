$(document).ready(function(){

    var addAppliance = function(){
        var appliance = '<div class="appliance-containter">\
                            <div class="appliance-meta">\
                              <div class="form-group">\
                                <label for="applianceName">Appliance </label>\
                                <input type="text" class="form-control applianceName" aria-describedby="applianceName">\
                                <small class="form-text text-muted">Name of appliance</small>\
                              </div>\
                              <div class="form-group">\
                                <label for="applianceNumber">Number of appliances</label>\
                                <input type="integer" class="form-control applianceNumber" aria-describedby="applianceNumber">\
                                <small class="form-text text-muted">number of such appliances</small>\
                              </div>\
                              <div class="form-group">\
                                <label for="applianceRating">Rating</label>\
                                <input type="integer" class="form-control applianceRating" aria-describedby="applianceRating">\
                                <small class="form-text text-muted">rating of the appliance</small>\
                              </div> \
                              </div> \
                              <button class="btn btn-danger remove-appliance">Remove Appliance</button><br/><br/> \
                              <div class="appliance-usage-container"></div><br/><br/> \
                              <button class="btn btn-success add-usage">+ Add Usage</button>\
                            </div> ';
    $('#appliances').append(appliance);
    }

    $('#add-appliance').click(function(){
        addAppliance();
    });

    $('#appliances').on('click','.remove-appliance',function(){
        $(this).parent().remove();
    });

    $('#appliances').on('click','.add-usage',function(){
        var parent = $(this).parent();
        var usageInterval = '<div class="appliance-usage">\
                                <label for="fromTime">From</label>\
                                <input class="form-control single-input fromTime" placeholder="Now">\
                                <label for="toTime">To</label>\
                                <input class="form-control single-input toTime" placeholder="Now">\
                                <br/><br/><button class="btn btn-danger remove-usage">Remove Usage interval</button>\
                             </div>';
    $(parent).find('.appliance-usage-container').append(usageInterval);
    $(parent).find('.single-input').clockpicker({
                                        placement: 'bottom',
                                        align: 'left',
                                        autoclose: true,
                                        'default': 'now'
                                    });;
    });

    $('#appliances').on('click','.remove-usage',function(){
        $(this).parent().remove();
    });

    $('#submit-survey').click(function(){
        var data = new Object();
        //User meta data
        data['name'] = $('#residentName').val();
        data['no_of_residents'] = $('#residentNumber').val();
        data['no_of_residents_gr_20'] = $('#residentAdultNumber').val();
        data['appliances'] = [];
        var appliance_nodes = ($('#survey').children())[1];    
        var appliance_data = $(appliance_nodes).children();
        appliance_data.map(function(index, appliance){
            var _appliance = new Object();
            _appliance['name'] = $(appliance).find('.applianceName').val();
            _appliance['number'] = $(appliance).find('.applianceNumber').val();
            _appliance['rating'] = $(appliance).find('.applianceRating').val();
            _appliance['usage_intervals'] = [];

            var _usageIntrevals = $(appliance).find('.appliance-usage');
            _usageIntrevals.map(function(index, usage){
                var _interval = new Object();
                _interval['from'] = $(usage).find('.fromTime').val(); 
                _interval['to'] = $(usage).find('.toTime').val();
                _appliance['usage_intervals'].push(_interval);
            });
        data['appliances'].push(_appliance); 
        }); 
        data = JSON.stringify(data);
        console.log(data);
        $.ajax({
            url: '/survey',
            data: data,
            type: 'POST',
            contentType: 'application/json',
            success: function(res){
                console.log(res);
            },
            error: function(res){
                console.log(res);
            }
        });
    });

});