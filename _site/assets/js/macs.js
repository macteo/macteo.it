/***********************
 *  CUSTOM TEMPLATES   *
 ***********************/

var macsConfig = {
  // colors: [ "#F00", "#0F0", "#00F" ], // branches colors, 1 per column
  branch: {
    lineWidth: 8,
    spacingX: 60
  },
  commit: {
    spacingY: -100,
    dot: {
      size: 12
    },
    message: {
      displayAuthor: false,
      displayBranch: false,
      displayHash: false,
      color: "#667",
      font: "normal 12pt Arial"
    },
    shouldDisplayTooltipsInCompactMode: false, // default = true
    tooltipHTMLFormatter: function ( commit ) {
      return "<b>" + commit.sha1 + "</b>" + ": " + commit.message;
    }
  }
};
var macsTemplate = new GitGraph.Template( macsConfig );

/***********************
 *    INITIALIZATION   *
 ***********************/

var config = {
  template: macsTemplate       // could be: "blackarrow" or "metro" or `macsTemplate`
};
var gitGraph = new GitGraph( config );

/***********************
 * BRANCHS AND COMMITS *
 ***********************/

 var empty = gitGraph.branch( {name: "empty", parentBranch: "none"});

 var emptyConfig = {
   dotColor: "white",
   dotSize: 10,
   dotStrokeColor: "#fff",
   messageDisplay: false
 };
 empty.commit( emptyConfig );

var plus = gitGraph.branch( {name: "plus", parentBranch: "none"});

var plusConfig = {
  dotColor: "white",
  dotSize: 40,
  dotStrokeWidth: 10,
  dotImage: "macs/plus.jpg",
  message: "Macintosh Plus"
};
plus.commit( plusConfig );

var parents = gitGraph.branch( {name: "parents", parentBranch: "none", parent: null});

var classicConfig = {
  dotColor: "white",
  dotSize: 40,
  dotStrokeWidth: 10,
  dotImage: "macs/classic.jpg",
  message: "Macintosh Classic"
};
parents.commit( classicConfig );

var lcConfig = {
  dotColor: "white",
  dotSize: 40,
  dotStrokeWidth: 10,
  dotImage: "macs/lc_II.jpg",
  message: "Macintosh LC II"
};
parents.commit( lcConfig );

var mac7200Config = {
  dotColor: "white",
  dotSize: 40,
  dotStrokeWidth: 10,
  dotImage: "macs/7200.jpg",
  message: "Power Macintosh 7200"
};
parents.commit( mac7200Config );

var laptop = gitGraph.branch( {name: "laptop", parentBranch: "none", parent: null});

var g3Config = {
  dotColor: "white",
  dotSize: 40,
  dotStrokeWidth: 10,
  dotImage: "macs/powerbook.jpg",
  message: "Powerbook G3"
};
laptop.commit( g3Config );

var imac17Config = {
  dotColor: "white",
  dotSize: 40,
  dotStrokeWidth: 10,
  dotImage: "macs/imac17.jpg",
  message: "iMac 17\""
};

parents.commit( imac17Config );

laptop.commit( "Start using it at the College to take notes");

var mbp15 = {
  dotColor: "white",
  dotSize: 40,
  dotStrokeWidth: 10,
  dotImage: "macs/mbp15.jpg",
  message: "MacBook Pro 15\""
};

laptop.commit( mbp15 );

parents.checkout();

laptop.merge(parents, {"message": "Gave the 15\" to my father"});

var mbp17 = {
  dotColor: "white",
  dotSize: 40,
  dotStrokeWidth: 10,
  dotImage: "macs/mbp17.jpg",
  message: "MacBook Pro 17\""
};

laptop.commit( mbp17 );

/***********************
 *       EVENTS        *
 ***********************/

// gitGraph.canvas.addEventListener( "graph:render", function ( event ) {
//   // console.log( event.data.id, "has been rendered with a scaling factor of", gitGraph.scalingFactor );
// } );
//
// gitGraph.canvas.addEventListener( "commit:mouseover", function ( event ) {
//   console.log( "You're over a commit.", "Here is a bunch of data ->", event.data );
//   this.style.cursor = "pointer";
// } );
//
// gitGraph.canvas.addEventListener("commit:mouseout", function (event) {
//   console.log( "You just left this commit ->", event.data );
//   this.style.cursor = "auto";
// });

// Attach a handler to the commit
// test.commit( {
//   message: "Click me!",
//   author: "Nicolas <me@planee.fr>",
//   onClick: function ( commit ) {
//     console.log( "You just clicked my commit.", commit );
//   }
// } );
