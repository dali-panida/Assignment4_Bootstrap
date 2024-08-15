console.log ('test');

fetch( '/assets/data/content.json' )
    .then( response => response.json() )
    .then( data => console.log( data ) )
    .catch( error => console.warn( `🥲 Nope: ${error}` ) );

$( document ).ready(function() {
    $.ajax(
        {
            url: "/assets/data/content.json", 
            success: function( data ) {
                console.log( data ); 

                $( '#trendTitle' ).html( data.card[0].cardTitle);
                $( '#dataListTitle' ).html(data.card[1].cardTitle);
                $('#taskListTitle').html(data.card[2].cardTitle);
                
                //Populate TREND
                data.card[0].trend.forEach(function( info ) {
                    $('#trendLists').append(
                        `<li class="list-group-item col py-3">
                            <p class="card-title"> NEW ${info.title}</p>
                            <h6 class="card-text number">${info.number}</h6>
                        </li>`
                    );
                });

                //Populate UNRESOLVED TICKETS
                data.card[1].tickets.forEach(function( info ) {
                    $('#dataLists').append(
                        `<li class="list-group-item d-flex justify-content-between p-3">
                        <p class="mb-0 text-body"> NEW ${info.title}</p>
                        <p class="mb-0 text-body-tertiary">${info.number}</p>
                    </li>`

                    );
                });

                // Populate Tasks

                data.card[2].tasks.forEach(function( task ) {

                    var statusStyle = "";
                    var checked = task.completed;
                    
                    if (task.status == "URGENT") {
                        statusStyle = "bg-warning text-white";
                    } else if (task.status == "NEW") {
                        statusStyle = "bg-success text-white";
                    } else {
                        statusStyle = "bg-secondary-subtle text-body-tertiary";
                    }

                    $('#taskLists').append(
                        `<li class="list-group-item d-flex justify-content-between align-items-center p-2">
                            <div class="list-title d-flex gap-2">
                                <input class="form-check-input rounded" type="checkbox" ${checked}>
                                <label class="form-check-label"> NEW ${task.title}</label>    
                            </div>
                            <div class="tag small rounded-3 ${statusStyle} px-3 py-2">${task.status}</div>
                        </li>`
                    );
                });
            

            },
            
            error: function(error) {
                console.error( `🥲 Nope: ${error}` );
            }
        });
    });