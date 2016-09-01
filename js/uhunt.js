'use strict';
/* Author: Felix Halim <felix.halim@gmail.com> */
/*global $, io, alert, MD5, window, document, localStorage */

var uHunt = angular.module('uHunt', ['uHunt.filters', 'uHunt.services', 'uHunt.directives', 'uHunt.controllers'])

.config(function($routeProvider) {
  $routeProvider.when('/chat',              { templateUrl: 'partials/chat.html' });
  $routeProvider.when('/live-submissions',  { templateUrl: 'partials/live-submissions.html' });
  $routeProvider.when('/statistics',        { templateUrl: 'partials/statistics.html' });
  $routeProvider.when('/problem-search',    { templateUrl: 'partials/problem-search.html' });
  $routeProvider.when('/cpbook',            { templateUrl: 'partials/cpbook.html' });
  $routeProvider.when('/next-problems',     { templateUrl: 'partials/next-problems.html' });
  $routeProvider.when('/ranklist',          { templateUrl: 'partials/ranklist.html' });
  $routeProvider.when('/vcontest',          { templateUrl: 'partials/vcontest.html' });
  $routeProvider.when('/statscmp',          { templateUrl: 'partials/statscmp.html' });
  $routeProvider.when('/web-api',           { templateUrl: 'partials/web-api.html' });
  $routeProvider.otherwise({redirectTo: '/chat'});
});


angular.module('uHunt.services', [])

.value('uhunt_delta_time', 0)
.value('uhunt_use_session', true)
.value('uhunt_max_live_submissions', 100)
.value('uhunt_verdict_map', {
   0: { name: "- In queue -",         short_name: "QU",   color: "#000000"}, // OT
  10: { name: "SubmissionErr",        short_name: "SE",   color: "#000000"}, // OT
  15: { name: "Can't be judged",      short_name: "CJ",   color: "#000000"}, // OT
  20: { name: "- In queue -",         short_name: "QU",   color: "#000000"}, // OT
  30: { name: "Compile error",        short_name: "CE",   color: "#AAAA00"},
  35: { name: "Restricted function",  short_name: "RF",   color: "#000000"}, // OT
  40: { name: "Runtime error",        short_name: "RE",   color: "#00AAAA"},
  45: { name: "Output limit",         short_name: "OL",   color: "#000066"},
  50: { name: "Time limit",           short_name: "TL",   color: "#0000FF"},
  60: { name: "Memory limit",         short_name: "ML",   color: "#0000AA"},
  70: { name: "Wrong answer",         short_name: "WA",   color: "#FF0000"},
  80: { name: "PresentationE",        short_name: "PE",   color: "#666600"},
  90: { name: "Accepted",             short_name: "AC",   color: "#00AA00"},
})
.value('uhunt_language_map', {
  1: { name: 'ANSI C',  color: 'darkorange' },
  2: { name: 'Java',    color: 'red' },
  3: { name: 'C++',     color: 'blue' },
  4: { name: 'Pascal',  color: 'black' },
  5: { name: 'C++11',   color: 'blue' },
})

.value('cpbook_1ed', [
  {title:'Introduction', arr:
  [{title:'Ad Hoc', arr:[
    ['Ad Hoc',100,272,394,483,-573,661,739,837,941,10082,10141,10281,10363,-10420,10528,10683,10703,-10812,10921,11044,11150,11223,11340,11498,11547,11616,11727,11800
  ]]},{title:'Preview Contest', arr:[
    ['Preview',-10360,10341,11292,-11450,10911,-11635,11506,10243,10717,11512,10065
  ]]}]},

  {title:'Data Structures and Libraries', arr:
  [{title:'Data Structures With Built-in Libraries', arr:[
    ['Static array, vector, bitset, Direct Addressing Table', -482,-594,-11340
    ],['STL algorithm', -146,-10194,-10258
    ],['Sorting-related problems', -299,612,10810,-11462,-11495
    ],['STL stack', 127,-514,-673,-727
    ],['STL queue', -336,-10901,-11034
    ],['STL map/set', -10226,11239,-11308,-11136
    ],['STL priority_queue <a target="_blank" href="http://www.comp.nus.edu.sg/~stevenha/visualization/heap.html"><img height="15" border"0" src="http://uhunt.felix-halim.net/images/img.png"></a>', -908,-11492
  ]]},{title:'Data Structures With Our-Own Libraries', arr:[
    ['Graph (simple ones)', -291,-10928
    ],['Union-Find Disjoint Sets', -459,-793,10158,10301,10369,10583,10608,-11503
    ],['Segment Tree', -11235,-11297,-11402
  ]]}]},

  {title:'Problem Solving Paradigms', arr:
  [{title:'Dynamic Programming', arr:[
    ['Longest Increasing Subsequence (LIS) - Classical', 103,111,231,-481,497,10051,10534,11003,-11456,-11790
    ],['Coin Change - Classical', 147,166,-357,674,-10306,10313,11137,-11517
    ],['Maximum Sum', -108,-507,836,10074,10667,10684,-10827
    ],['0-1 Knapsack - Classical', -562,-990,-10130
    ],['Non Classical (medium difficulty)', 116,-473,607,-10003,-10337,10891,11450
    ],['DP + Bitmasks', -10364,-10651,10908,-10911
    ],['DP on \'Graph Problem\'', -590,-910,10681,-10702
    ],['DP on Tree', -10243,-11307
  ]]},{title:'Complete Search', arr:[
    ['Iterative', 154,441,639,-725,-10360,10662,-11242,11804
    ],['Recursive Backtracking', -193,222,524,-624,628,729,-750,10285,10309,10496
  ]]},{title:'Divide and Conquer',arr:[
    ['Divide and Conquer', -679,-714,957,10077,-10341,10369,10474,10611,11262
  ]]},{title:'Greedy', arr:[
    ['Greedy', -410,10020,-10340,10440,-10670,10763,11054,11292,11369
  ]]}]},

  {title:'Graph', arr:
  [{title:'Depth First Search', arr:[
    ['Finding Connected Components / Flood Fill', 260,352,459,-469,572,-657,782,784,785,852,10336,10926,10946,-11110,11518,11749
    ],['Finding Articulation Points / Bridges', -315,610,-796,-10199
    ],['Finding Strongly Connected Components', -10731,-11504,-11709,11770
    ],['Topological Sort', -124,200,-872,-10305
  ]]},{title:'Breadth First Search', arr:[
    ['SSSP on Unweighted Graph', -336,383,417,429,439,-532,567,627,762,924,928,10009,10044,10067,10102,10150,10422,10610,-10653,10959,11049,11352,11513,11545,11730,11792
    ],['Variants', -10004,10505,11080,-11101,-11624
  ]]},{title:'Kruskal\'s', arr:[
    ['Standard Application (for MST)', -908,10034,10307,11228,-11631,11710,11733,-11747
    ],['Variants', 10147,-10369,-10397,-10600,10842
  ]]},{title:'Dijkstra\'s', arr:[
    ['Dijkstra\'s', -341,929,10278,10603,-10801,10986,11377,-11492,11635
  ]]},{title:'Bellman Ford\'s', arr:[
    ['Bellman Ford\'s', -558,-10557,-11280
  ]]},{title:'Floyd Warshall\'s', arr:[
    ['Standard Application (for APSP or SSSP on small graph)', 186,341,423,-821,10075,-10171,10246,10724,10793,10803,11015,-11463
    ],['Variants', -334,534,544,-869,925,-10048,10099
  ]]},{title:'Ford Fulkerson\'s / Edmonds Karps\'s', arr:[
    ['Standard Application (for Max Flow/Min Cut)', -820,-10480,10779,-11506
    ],['Variants', -563,-10330,10511,-10594,10806
  ]]},{title:'Special Graph', arr:[
    ['Tree', 112,115,122,536,615,699,712,-10308,10459,10701,-10938,-11695
    ],['Single-Source Shortest/Longest Paths in DAG', -103,-10000,10029,10166,-10350,11324
    ],['Counting Paths in DAG', -825,-926,-988
    ],['Max Cardinality Bipartite Matching', -670,753,10080,-10092,10735,-11045,11418
    ],['Max Weighted Independent Set in Bipartite Graph', -11159
    ],['Max Vertex Cover in Bipartite Graph', -11419
  ]]}]},

  {title:'Mathematics',arr:
  [{title:'Number Theory', arr:[
    ['Ad Hoc', 344,377,-10346,10940,-11130,-11231,11313,11428,11547,11723,11805
    ],['Prime Numbers', 294,406,516,524,-543,583,686,897,914,10006,10042,10140,10200,10235,10311,10394,10533,-10539,10637,10650,10699,-10738,10780,10789,10852,10924,10948,11287,11408,11466
    ],['GCD/LCM', 332,412,530,10193,-10407,10680,-10717,-10892,11388,11417
    ],['Euler\'s Totient (Phi) Function', -10179,-10299,-10820,11064,11327
    ],['Extended Euclid', -718,-10090,-10104
    ],['Modulo Arithmetic', -374,602,10174,-10176,-10212,10489
    ],['Fibonacci Numbers', 495,-763,900,948,10183,10229,-10334,10450,10497,10579,-10862,11000,11161,11780
    ],['Factorial', 160,-324,568,-623,884,10061,10139,10220,10323,10780,10856,-11347,11415
    ],['Big Integer (use Java)', 343,355,389,424,446,636,10083,10106,10473,-10523,10551,-10814,-10925
    ],['Combinatorics', 326,369,-991,-10007,10219,10303,10375,10784,10790,10918,11069,11115,11204,11310,-11401,11554
    ],['Cycle-Finding', -350,408,944,-10591,11036,-11053,11549
  ]]},{title:'Sequences and Number Systems', arr:[
    ['Sequences', -100,413,694,-10408,-10930,11063
    ],['Number Systems', 136,138,-443,640,962,974,10006,-10042,10044,10101,10591,11461,-11472
  ]]},{title:'Others', arr:[
      ['Probability Theory', 474,542,10056,-10491,-11176,-11181,11500
    ],['Linear Algebra', -10089,-10109
  ]]}]},

  {title:'String Processing', arr:
  [{title:'Ad Hoc String Processing', arr:[
    ['Ad Hoc', 148,159,263,353,401,409,-422,537,644,865,-902,10010,10115,10197,10293,10391,10508,10815,10878,10896,11048,11056,11062,11221,11233,11278,11362,-11385,11713,11716,11734
  ]]},{title:'String Processing with DP', arr:[
    ['String Processing with DP', -164,531,10066,10100,-10192,10405,10739,-11151
  ]]},{title:'Suffix Array', arr:[
    ['Suffix Array', -719,10526,-11107,-11512
  ]]}]},

  {title:'(Computational) Geometry', arr:
  [{title:'Geometry Basics', arr:[
    ['Lines', 184,-270,833,10180,10242,-10263,11068,-11227
    ],['Circles (only)', -10005,-10012,10136,10221,10432,-10451,10589
    ],['Triangles (plus Circles)', 143,-190,438,10195,-10286,10347,10991,-11152,11437,11479,11524,11579
    ],['Rectangles', 201,-476,922,10502,10908,-11207,-11455
    ],['Great Circle Distance', -535,-10075,10316,10897,-11817
    ],['Polygons', 478,-634,-10078,10112,-11447,11473
    ],['Other Basic Geometry', -10088,-10297,10387,11232,-11507
  ]]},{title:'Graham\'s Scan for Convex Hull', arr:[
    ['Graham\'s Scan', -109,218,361,681,-811,10002,-10065,10135,10173,11626
  ]]},{title:'Intersection Problems', arr:[
    ['Line Segment Intersection', -191,-378,866,920,972,-10902,11343
    ],['Other Objects', 453,-460,-737,904,-10301,10321,11122,11345,11515,11601,11639
  ]]},{title:'Divide and Conquer Revisited', arr:[
    ['Divide and Conquer Revisited', -10245,-10566,11378,-11646,11648
  ]]}]}
])

.value('cpbook_2ed', [
  {title:"Introduction", arr:
  [{title:"Ad Hoc Problems - Part 1", arr:[
    ["Easy", 272, 494, 499, 10300, -10420, 10550, 11044, 11172, 11332, 11498, 11547, -11559, 11727, 11764, -11799, 11942, 12015
    ],["Game (Card)", 162, -462, 555, -10205, -10646, 11225, 11678
    ],["Game (Chess)", 255, -278, -696, 10196, -10284, 10849, 11494
    ],["Game (Others)", 220, 227, 232, 339, 340, 489, -584, 647, -10189, 10279, 10363, 10409, 10443, 10530, 10813, 10903, -11459
    ],["Josephus", 130, 133, -151, -305, 402, 440, -10015
    ],["Palindrome / Anagram", 148, -156, -195, 353, 401, 454, 630, 10018, 10098, 10945, -11221, 11309
  ]]},{title:"Ad Hoc Problems - Part 2", arr:[
    ["Interesting Real Life Problems", -161, 346, 400, 403, 448, 538, -637, 706, 10082, 10191, 10415, 10528, 10554, 10659, -10812, 11223, 11530, 11743, 11984
    ],["Time", 170, 300, -579, -893, 10070, 10371, 10683, 11219, 11356, 11650, 11677, -11947, 11958, 12019
    ],["Just Ad Hoc", 101, 114, 119, 121, 139, 141, 144, 145, 187, 335, 337, 349, 362, 379, 381, 405, 434, 457, 496, -556, 573, 608, 621, 661, -978, 1091, 1225, 1241, 10019, 10033, -10114, 10141, 10142, 10188, 10267, 10324, 10424, 10707, 10865, 10919, 10963, 11140, 11507, 11586, 11661, 11679, 11687, 11717, 11850, 11917, 11946, 11956, 12060, 12085, 12136, 12250
  ]]}]},

  {title:"Data Structures and Libraries", arr:
  [{title:"Linear Data Structures with Built-in Libraries", arr:[
    ["Basic Data Structures", 394, 414, 466, 467, 482, 541, 591, 594, 700, 10016, 10038, 10050, 10260, 10703, 10855, 10920, 10978, 11040, 11192, 11222, -11340, 11349, 11360, 11364, 11496, -11581, 11608, 11760, 11835, 11933, -11988
    ],["C++ STL algorithm (Java Collections)", 123, -146, 1209, 10194, -10258, 10880, 10905, 11039, 11321, -11588, 11621, 11777, 11824
    ],["Sorting-related problems", 110, 299, 450, 612, -855, 10107, 10327, 10810, -11462, 11495, 11714, -11858
    ],["C++ STL stack (Java Stack)", 120, 127, -514, 551, 673, -727, 732, 10858, -11111
    ],["C++ STL queue (Java Queue)", 540, -10172, -10901, 10935, -11034
  ]]},{title:"Non Linear Data Structures with Built-in Libraries", arr:[
    ["C++ STL priority_queue (Java PriorityQueue) <a target='_blank' href='http://www.comp.nus.edu.sg/~stevenha/visualization/heap.html'><img height='15' border'0' src='http://uhunt.felix-halim.net/images/img.png'></a>", -1203, -10954, -11995
    ],["C++ STL map/set (Java TreeMap/TreeSet)", 417, 484, 501, 642, 755, 860, -10226, 10282, 10295, 10374, 10686, 10815, 11062, 11136, 11239, -11286, 11308, -11629, 11849, 11860
  ]]},{title:"Data Structures with Our-Own Libraries", arr:[
    ["Graph Data Structures Problems <a target='_blank' href='http://www.comp.nus.edu.sg/~stevenha/visualization/representation.html'><img height='15' border'0' src='http://uhunt.felix-halim.net/images/img.png'></a>", 599, -10720, -10895, 10928, 11414, 11550, -11991
    ],["Union-Find Disjoint Sets", 459, -793, 10158, 10178, 10227, -10507, 10583, 10608, 10685, -11503, 11690, 11966
    ],["Tree-related Data Structures <a target='_blank' href='http://www.comp.nus.edu.sg/~stevenha/visualization/bit.html'><img height='15' border'0' src='http://uhunt.felix-halim.net/images/img.png'></a>", 297, 1232, -11235, 11297, 11350, -11402, 11525, -11926, 12086
  ]]}]},

  {title:"Problem Solving Paradigms", arr:
  [{title:"Complete Search", arr:[
    ["Iterative (The Easier Ones)", 102, 105, 140, 154, 188, 256, 296, 331, 347, 386, -435, 441, 471, 617, 626, 725, 927, 1237, 1260, 10041, 10102, 10365, 10487, 10662, 10677, 10976, 11001, 11005, 11059, 11078, -11242, 11342, 11412, 11565, -11742
    ],["Iterative (The More Challenging Ones)", 253, 639, 703, 735, 932, 10125, 10177, 10360, -10660, 10973, 11108, -11205, -11553, 11804, 11959
    ],["Recursive Backtracking (The Easier Ones)", 167, 222, 380, 487, 524, 539, 574, 598, -624, 628, 677, 729, 750, 1261, 10017, 10276, 10344, 10452, 10475, -10503, 10576, -11085, 11201, 12249
    ],["Recursive Backtracking (The More Challenging Ones)", 165, 193, 208, -416, 433, 565, 868, 1098, 1262, 10094, -10309, 10582, -11195
  ]]},{title:"Dynamic Programming", arr:[
    ["Longest Increasing Subsequence (LIS)", 111, 231, 437, -481, 497, 1196, 10131, 10534, -11456, -11790
    ],["Max Sum", -108, -507, 787, 836, 983, 10074, 10667, 10684, -10827
    ],["0-1 Knapsack (Subset Sum)", 562, 990, 1213, 10130, 10261, -10616, 10664, -10819, 11658, -11832
    ],["Coin Change (CC)", 147, 166, -357, 674, -10306, 10313, 11137, -11517
    ],["Traveling Salesman Problem (TSP)", -216, -10496, -11284
    ],["Other Classical Problems", -348, -10304
    ],["Non Classical (The Easier Ones)", 116, 571, 10003, 10036, -10337, 10400, 10465, -10721, 10910, 10912, -10943, 11341, 11407, 11420, 11450, 11703
  ]]},{title:"Greedy", arr:[
    ["Standard", 311, 410, 1193, 10020, 10026, 10152, 10249, 10340, 10382, 10440, 10602, -10656, 10670, 10672, 10700, 10714, 10718, 10747, 10763, 10785, 11054, 11103, -11157, 11292, 11369, -11389, 11520, 11532, 11567, 11729, 11900
  ]]},{title:"Divide and Conquer", arr:[
    ["Binary Search", 679, 957, 1195, 10077, -10341, 10474, 10611, 10706, 10742, 11057, -11413, 11876, 11881, -11935
  ]]}]},

  {title:"Graph", arr:
  [{title:"Graph Traversal <a target='_blank' href='http://www.comp.nus.edu.sg/~stevenha/visualization/dfsbfs.html'><img height='15' border'0' src='http://uhunt.felix-halim.net/images/img.png'></a>", arr:[
    ["Just Graph Traversal", 118, -168, 280, 614, 824, 1205, 10113, 10116, 10377, 10687, -11831, -11902, 11906
    ],["Flood Fill/Finding Connected Components", 260, 352, 469, 572, 657, 776, 782, 784, 785, 852, 871, 1197, 10336, 10946, -11094, -11110, 11244, 11470, 11518, 11561, 11749, -11953
    ],["Topological Sort", 124, 200, -872, -10305, -11060, 11686
    ],["Bipartite Graph Check", -10004, 10505, -11080, -11396
    ],["Finding Articulation Points/Bridges", -315, 610, -796, -10199
    ],["Finding Strongly Connected Components", -247, 1229, 10731, -11504, 11709, 11770, -11838
  ]]},{title:"Minimum Spanning Tree <a target='_blank' href='http://www.comp.nus.edu.sg/~stevenha/visualization/mst.html'><img height='15' border'0' src='http://uhunt.felix-halim.net/images/img.png'></a>", arr:[
    ["Standard", 908, 1208, 1235, 10034, -11228, -11631, 11710, 11733, -11747, 11857
    ],["Variants", 534, 544, 1216, 1234, 1265, -10048, 10099, 10147, -10369, 10397, 10462, -10600, 10842
  ]]},{title:"Single-Source Shortest Paths (SSSP) <a target='_blank' href='http://www.comp.nus.edu.sg/~stevenha/visualization/sssp.html'><img height='15' border'0' src='http://uhunt.felix-halim.net/images/img.png'></a>", arr:[
    ["On Unweighted Graph: BFS", 314, -321, 336, 383, 429, 439, 532, 567, 627, 762, 924, 928, 1251, 1253, 10009, 10044, -10047, 10067, 10150, 10422, 10610, 10653, 10959, 10977, 11049, -11101, 11352, 11513, 11624, 11792, 11974, 12160
    ],["On Weighted Graph: Dijkstra's", 341, 929, 1202, 10166, 10269, 10278, 10389, 10603, -10801, 10986, -11367, 11377, -11492, 11833, 12138
    ],["On Graph with Negative Weight Cycle: Bellman Ford's", -558, -10557, -11280
  ]]},{title:"All-Pairs Shortest Paths", arr:[
    ["Standard", 186, 423, -821, 1198, 1233, 1247, -10171, 10724, 10793, 10803, 10947, 11015, -11463
    ],["Variants", -104, 125, 436, -334, 869, -11047
  ]]},{title:"Maximum Flow <a target='_blank' href='http://www.comp.nus.edu.sg/~stevenha/visualization/maxflow.html'><img height='15' border'0' src='http://uhunt.felix-halim.net/images/img.png'></a>", arr:[
    ["Standard", -259, 753, -820, -10480, 10511, 10779
    ],["Variants", 563, 1242, 1259, 10092, 10330, -10594, -10746, 10806, -11506
  ]]},{title:"Special Graph (Directed Acyclic Graph)", arr:[
    ["Single-Source Shortest/Longest Paths on DAG", 103, -452, 10000, 10051, 10259, -10285, -10350
    ],["Counting Paths in DAG", 825, 926, 986, -988, -10401, 10926, 11067, -11957
    ],["Converting General Graph to DAG", 590, 907, 910, 1218, 10201, -10243, 10543, 10702, 10874, -10913, 11307, -11487, 11545, 11782, 12135
  ]]},{title:"Special Graphs (Others)", arr:[
    ["Tree", 112, 115, 122, 536, 615, 699, 712, 839, 10308, 10701, -10938, -11615, -11695
    ],["Eulerian Graph", 117, 291, -10054, 10129, -10203, -10596
    ],["Bipartite Graph", 670, 1184, 1194, 1201, 1212, 10080, -10349, 11045, -11138, -11159, 11418, 11419, 12083, 12168
  ]]}]},

  {title:"Mathematics", arr:
  [{title:"Ad Hoc Mathematics Problems", arr:[
    ["The Simpler Ones", 10055, 10071, 10281, 10469, -10773, 11614, -11723, 11805, -11875
    ],["Mathematical Simulation (Brute Force)", 100, 371, 382, -616, 834, 846, 906, 10035, -10346, 10370, 10783, 10879, -11130, 11150, 11247, 11313, 11689, 11877, 11934, 11968, 11970
    ],["Finding Pattern or Formula", 913, 10014, -10161, 10170, -10427, 10499, 10509, 10666, 10693, 10696, 10940, 10970, 10994, 11202, -11231, 11296
    ],["Grid", -264, 808, 880, -10182, -10233, 10620, 10642
    ],["Number Systems or Sequences", 136, 138, 413, -443, 640, 694, 962, 974, 1256, 10006, -10042, 10101, -10408, 10930, 11063, 11461, 11660
    ],["Logarithm, Exponentiation, Power", 107, 113, -701, -10916, 11636, 11666, -11847, 11986
    ],["Polynomial", 392, -498, -10268, 10302, -10586, 10719
    ],["Base Number Variants", -377, -575, 10093, -10931, 11121
    ],["Just Ad Hoc", 276, 344, 759, -10137, 10190, -11526, -11616, 11715, 11816
  ]]},{title:"Java BigInteger Class", arr:[
    ["Basic Features", 424, 465, 619, -713, 748, 1226, 10013, 10083, 10106, 10198, 10494, 10519, -10523, 10669, 10925, 11448, 11830, -11879, 12143
    ],["Bonus Features", 290, 343, 355, -389, 446, 636, 1230, 10464, 10473, 10551, -10814, 11185, -11821
  ]]},{title:"Combinatorics", arr:[
    ["Fibonacci Numbers", 495, 580, -763, 900, 948, 1258, 10183, -10334, 10450, 10497, 10579, -10689, 10862, 11000, 11161, 11780
    ],["Binomial Coefficients", 326, 369, -485, 530, 10105, -10219, 10375, -11955
    ],["Catalan Numbers", -991, -10007, 10223, -10303
    ],["Other Combinatorics", 1224, 1264, 10079, 10359, 10733, 10784, 10790, 10843, 10918, -11069, 11115, 11204, -11310, -11401, 11480, 11554, 11597, 11609
  ]]},{title:"Number Theory", arr:[
    ["Prime Numbers", 406, -543, 686, 897, 914, 1210, 10140, 10168, 10200, 10235, 10311, 10394, 10490, -10539, 10650, -10738, 10852, 10924, 10948, 11287, 11752
    ],["GCD and/or LCM", 106, 332, 408, 412, 10193, -10407, -10892, 11388, 11417, -11827
    ],["Factorial", -324, 568, -623, 10220, 10323, -10338
    ],["Finding Prime Factors", -516, -583, 10392, -11466
    ],["Working with Prime Factors", 160, 993, 10061, -10139, 10484, 10527, 10622, -10680, 10780, 10791, 11347, -11889, 12090
    ],["Functions involving Prime Factors", -294, 884, 1246, -10179, 10299, 10699, 10820, 11064, 11086, 11226, 11327, -11728
    ],["Modulo Arithmetic", 128, -374, 10127, 10174, -10176, -10212, 10489
    ],["Extended Euclid", -10090, -10104, 10633, 10673
    ],["Other Number Theory Problems", 547, 756, -10110, 10922, 10929, 11042, -11344, -11371
  ]]},{title:"Probability Theory", arr:[
    ["Standard", 474, 545, 10056, 10238, 10328, -10491, -10759, 11181, 11500, 11628, -12024
  ]]},{title:"Cycle-Finding", arr:[
    ["Standard", 202, 275, -350, 944, 10162, 10515, 10591, 11036, -11053, 11549, -11634
  ]]},{title:"Game Theory", arr:[
    ["Standard", 847, -10111, 10165, 10368, 10404, 10578, -11311, -11489
  ]]},{title:"Powers of a (Square) Matrix", arr:[
    ["Standard", -10229, -10681, -10870
  ]]}]},

  {title:"String Processing", arr:
  [{title:"Ad Hoc String Processing Problems", arr:[
    ["Cipher/Encode/Encrypt/Decode/Decrypt", 213, 245, 306, 444, 458, 468, 483, 492, 641, 739, 740, 741, 795, 850, 856, 865, 10222, -10851, -10878, 10896, 10921, 11220, 11278, -11385, 11541, 11697, 11716, 11787
    ],["Frequency Counting", 895, -902, 10008, 10062, -10252, 10293, 10625, 10789, -11203, 11577
    ],["Input Parsing", 271, 325, 327, 384, 391, 397, 442, 464, 486, 537, 576, 620, -622, 743, 933, -10058, 10854, 11148, -11878
    ],["Output Formatting", 320, 445, -488, 490, 10500, -10800, -10894, 11074, 11965
    ],["String Comparison", 409, -644, 671, -11048, -11056, 11233, 11713, 11734
    ],["Just Ad Hoc", 153, 263, 789, 892, -941, 1200, 1215, 1219, 1239, 10115, 10197, 10361, 10391, -10393, 10508, 10679, 10761, -11452, 11483, 11839, 11962, 12134
  ]]},{title:"String Matching", arr:[
    ["Standard", 455, -10298, 11362, -11475, -11576, 11888
    ],["In 2D Grid", -422, -10010, -11283
  ]]},{title:"String Processing with Dynamic Programming", arr:[
    ["Standard", 164, -526, 531, 963, 1192, 1207, 10066, 10100, 10192, 10405, 10617, -10635, 10739, -11151, 11258
  ]]},{title:"Suffix Trie, Tree, Array", arr:[
    ["Standard", 719, -760, 1223, 1227, 1254, -11107, -11512
  ]]}]},

  {title:"(Computational) Geometry", arr:
  [{title:"Basic Geometry", arr:[
    ["Points and Lines", 184, 191, 270, 356, 378, 587, 833, 837, -920, 1249, 10167, 10242, -10263, 10310, 10357, 10466, 10585, 10902, 10927, 11068, -11227, 11343, 11505
    ],["Circles (only)", -10005, -10012, 10136, 10180, 10209, 10221, 10301, 10432, -10451, 10573, 10589, 10678, 11515
    ],["Triangles (plus Circles)", 143, 190, 375, 438, 10195, 10210, 10286, 10347, 10387, 10522, -10577, 10991, -11152, 11479, 11854, -11909, 11936, 12165
    ],["Quadrilaterals", 155, 201, -460, 476, 477, 10502, 10823, 10908, -11207, 11345, 11455, 11639, -11834
    ],["Great-Circle Distance", -535, -10075, 10316, 10897, -11817
    ],["Other 3D Objects", -737, -815, -10297
  ]]},{title:"Polygon <a target='_blank' href='http://www.comp.nus.edu.sg/~stevenha/visualization/convexhull.html'><img height='15' border'0' src='http://uhunt.felix-halim.net/images/img.png'></a>", arr:[
    ["Standard", 109, 218, 361, 478, 634, 681, -811, 858, 1206, 10060, 10065, 10078, 10088, 10112, 10406, -10652, 11096, -11265, 11447, 11473, 11626
  ]]},{title:"Divide and Conquer", arr:[
    ["Standard", -152, -10245, 10566, 10668, 11378, -11646
  ]]}]},

  {title:"More Advanced Topics", arr:
  [{title:"Problem Decomposition", arr:[
    ["Two Components - Binary Search the Answer and Other", 714, 1199, 1221, 10804, -10816, -10983, -11262, 11516, 12255
    ],["Two Components - Involving DP 1D Range Sum", 967, 10533, -10871, -10891, -11408
    ],["Two Components - SSSP and DP", 10917, -10937, 10944, -11405, -11813
    ],["Two Components - Involving Graph", 1243, 1250, 1263, 10307, 11267, -11324, -11635, -11721, 12070, 12074, 12159
    ],["Two Components - Involving Mathematics", -10637, -10717, -11428, 11730, 12137
    ],["Three/More Components", -1079, -10856, -11610
  ]]},{title:"More Advanced Dynamic Programming", arr:[
    ["DP + bitmask <a target='_blank' href='http://www.comp.nus.edu.sg/~stevenha/visualization/bitmask.html'><img height='15' border'0' src='http://uhunt.felix-halim.net/images/img.png'></a>", 1099, 1204, 1252, -10296, 10364, 10651, -10817, 10911, 11218, -11391, 11472, 12063,
    ],["The More Challenging Ones", -473, 607, 882, 1096, 1211, 1214, 1220, 1222, 1228, 1231, 1236, 1238, 1240, 1244, 1245, 1248, 1255, 10069, 10081, 10163, 10164, 10271, -10482, -10626, 10898, 11285
  ]]},{title:"More Advanced Search", arr:[
    ["A*/IDA*", 652, 1217, 10073, -10181, -11163, -11212
  ]]}]}
])

.value('cpbook_3ed', [
  {title:"Introduction", arr:
  [{title:"Getting Started: The Easy Problems", arr:[
    ["Super Easy", 272, 1124, 10550, 11044, -11172, 11364, -11498, 11547, -11727, 12250, 12279, 12289, 12372, 12403, 12577
    ],["Easy", 621, -10114, 10300, 10963, 11332, -11559, 11679, 11764, -11799, 11942, 12015, 12157, 12468, 12503, 12554
    ],["Medium", 119, -573, 661, -10141, 10324, 10424, 10919, -11507, 11586, 11661, 11683, 11687, 11956, 12478
  ]]},{title:"Ad Hoc Problems - Part 1", arr:[
    ["Game (Card)", 162, -462, 555, 10205, 10315, -10646, 11225, 11678, -12247
    ],["Game (Chess)", 255, -278, -696, 10196, -10284, 10849, 11494
    ],["Game (Others), Easier", 340, -489, 947, -10189, 10279, 10409, 10530, -11459, 12239
    ],["Game (Others), Harder", 114, 141, 220, 227, 232, 339, 379, -584, 647, 10363, -10443, -10813, 10903
    ],["Palindrome", 353, -401, 10018, -10945, -11221, 11309
    ],["Anagram", 148, -156, -195, -454, 630, 642, 10098
    ],["Interesting Real Life Problems, Easier", -161, 187, 362, -637, 857, 10082, 10191, 10528, 10554, -10812, 11530, 11945, 11984, 12195, 12555
    ],["Interesting Real Life Problems, Harder", 139, 145, 333, 346, -403, 447, 448, 449, 457, 538, -608, 706, -1061, 10415, 10659, 11223, 11743, 12342
  ]]},{title:"Ad Hoc Problems - Part 2", arr:[
    ["Time", 170, 300, -579, -893, 10070, 10339, 10371, 10683, 11219, 11356, 11650, 11677, -11947, 11958, 12019, 12136, 12148, 12439, 12531
    ],["'Time Waster' Problems", 144, 214, 335, 337, 349, 381, 405, -556, 603, 830, 945, 10033, 10134, 10142, 10188, 10267, 10961, 11140, 11717, -12060, -12085, 12608
  ]]}]},

  {title:"Data Structures and Libraries", arr:
  [{title:"Linear Data Structures with Built-in Libraries", arr:[
    ["1D Array Manipulation", 230, 394, 414, 467, 482, 591, 665, 755, -10038, 10050, 10260, 10978, 11093, 11192, 11222, -11340, 11496, 11608, 11850, 12150, -12356
    ],["2D Array Manipulation", 101, 434, 466, 541, 10016, 10703, -10855, -10920, 11040, 11349, 11360, -11581, 11835, 12187, 12291, 12398
    ],["C++ STL algorithm (Java Collections)", 123, -146, 400, 450, 790, 855, 1209, 10057, -10107, 10194, -10258, 10698, 10880, 10905, 11039, 11321, 11588, 11777, 11824, 12541
    ],["Bit Manipulation", 594, 700, 1241, -10264, 11173, 11760, -11926, -11933
    ],["C++ STL list (Java LinkedList)", -11988
    ],["C++ STL stack (Java Stack)", 127, -514, -732, -1062, 10858
    ],["C++ STL queue and deque (Java Queue and Deque)", 540, -10172, -10901, 10935, -11034, 12100, 12207
  ]]},{title:"Non Linear Data Structures with Built-in Libraries", arr:[
    ["C++ STL map (Java TreeMap)", 417, 484, 860, 939, 10132, 10138, -10226, 10282, 10295, 10686, 11239, -11286, 11308, 11348, -11572, 11629, 11860, 11917, 12504, 12592
    ],["C++ STL set (Java TreeSet)", 501, -978, 10815, 11062, -11136, -11849, 12049
    ],["C++ STL priority_queue (Java PriorityQueue)", -1203, -10954, -11995
  ]]},{title:"Data Structures with Our-Own Libraries", arr:[
    ["Graph Data Structures Problems", -599, -10895, 10928, 11550, -11991
    ],["Union-Find Disjoint Sets", -793, 1197, 10158, 10227, -10507, 10583, 10608, 10685, -11503, 11690
    ],["Tree-related Data Structures", 297, 1232, -11235, 11297, 11350, -11402, 12086, -12532
  ]]}]},

  {title:"Problem Solving Paradigms", arr:
  [{title:"Complete Search", arr:[
    ["Iterative (One Loop, Linear Scan)", 102, 256, -927, -1237, -10976, 11001, 11078
    ],["Iterative (Two Nested Loops)", 105, 347, 471, 617, 725, -1260, 10041, -10487, 10730, -11242, 12488, 12583
    ],["Iterative (Three or More Nested Loops, Easier)", 154, 188, -441, 626, 703, -735, -10102, 10502, 10662, 10908, 11059, 11975, 12498, 12515
    ],["Iterative (Three or More Nested Loops, Harder)", 253, 296, 386, 10125, 10177, 10360, 10365, 10483, -10660, 10973, 11108, -11236, 11342, 11548, -11565, 11804, 11959
    ],["Iterative (Fancy Techniques)", 140, 234, 435, 639, -1047, 1064, 11205, 11412, -11553, 11742, 12249, 12346, 12348, 12406, -12455
    ],["Recursive Backtracking (Easy)", 167, 380, 539, -624, 628, 677, 729, 750, 10276, 10344, 10452, -10576, -11085
    ],["Recursive Backtracking (Medium)", 222, 301, 331, 487, -524, 571, -574, 598, 775, 10001, 10063, 10460, 10475, -10503, 10506, 10950, 11201, 11961
    ],["Recursive Backtracking (Harder)", 129, 165, -193, 208, -416, 433, 565, 861, 868, -1262, 10094, 10128, 10582, 11090
  ]]},{title:"Dynamic Programming", arr:[
    ["Max 1D Range Sum", 507, -787, -10684, -10755
    ],["Max 2D Range Sum", -108, 836, 983, 10074, 10667, -10827, -11951
    ],["Longest Increasing Subsequence (LIS)", 111, 231, 437, -481, 497, 1196, 10131, 10534, 11368, -11456, -11790
    ],["0-1 Knapsack (Subset Sum)", 562, 990, 1213, 10130, 10261, -10616, 10664, -10819, 11003, 11341, -11566, 11658
    ],["Coin Change (CC)", 147, 166, -357, 674, -10306, 10313, 11137, -11517
    ],["Traveling Salesman Problem (TSP)", -216, -10496, -11284
    ],["Non Classical (The Easier Ones)", 116, 196, 1261, 10003, 10036, 10086, -10337, 10400, 10446, 10465, 10520, 10688, -10721, 10910, 10912, -10943, 10980, 11026, 11407, 11420, 11450, 11703
  ]]},{title:"Greedy", arr:[
    ["Classical, Usually Easier", 410, 1193, 10020, 10382, -11264, -11389, 12321, -12405
    ],["Involving Sorting (Or The Input Is Already Sorted)", 10026, 10037, 10249, 10670, 10763, 10785, -11100, 11103, 11269, -11292, 11369, 11729, 11900, -12210, 12485
    ],["Non Classical, Usually Harder", 311, 668, 10152, 10340, 10440, 10602, -10656, 10672, 10700, 10714, -10718, 10982, 11054, -11157, 11230, 11240, 11335, 11520, 11532, 11567, 12482
  ]]},{title:"Divide and Conquer", arr:[
    ["Binary Search", 679, 957, 10077, 10474, -10567, 10611, 10706, 10742, -11057, 11621, 11701, 11876, -12192
    ],["Binary Search the Answer", -10341, -11413, 11881, 11935, -12032, 12190
    ],["Other Divide and Conquer Problems", -183
  ]]}]},

  {title:"Graph", arr:
  [{title:"Graph Traversal", arr:[
    ["Just Graph Traversal", 118, 168, 280, 318, 614, 824, 10113, 10116, 10377, 10687, -11831, 11902, -11906, 12376, -12442, 12582
    ],["Flood Fill/Finding Connected Components", 260, 352, 459, 469, 572, 657, 722, 758, 776, 782, 784, 785, 852, 871, -1103, 10336, 10707, 10946, -11094, 11110, 11244, 11470, 11518, 11561, 11749, -11953
    ],["Topological Sort", 124, 200, -872, -10305, -11060, 11686
    ],["Bipartite Graph Check", -10004, 10505, -11080, -11396
    ],["Finding Articulation Points/Bridges", -315, 610, -796, 10199, -10765
    ],["Finding Strongly Connected Components", -247, 1229, 10731, -11504, 11709, 11770, -11838
  ]]},{title:"Minimum Spanning Tree", arr:[
    ["Standard", 908, 1174, 1208, 1235, 10034, -11228, -11631, 11710, 11733, -11747, 11857
    ],["Variants", 534, 544, 1160, 1216, 1234, -10048, 10099, 10147, -10369, 10397, 10462, -10600, 10842
  ]]},{title:"Single-Source Shortest Paths (SSSP)", arr:[
    ["On Unweighted Graph: BFS, Easier", 336, 383, 388, -429, 627, 762, -924, 1148, 10009, 10422, 10610, -10653, 10959
    ],["On Unweighted Graph: BFS, Harder", -314, 532, 859, 949, 10044, 10067, 10150, 10977, 11049, -11101, 11352, 11624, 11792, -12160
    ],["On Weighted Graph: Dijkstra's, Easier", -929, -1112, 10389, -10986
    ],["On Weighted Graph: Dijkstra's, Harder", 1202, 10166, 10187, 10278, 10356, 10603, -10801, 10967, 11338, 11367, 11377, -11492, 11833, -12047, 12144
    ],["On Graph with Negative Weight Cycle: Bellman Ford's", -558, -10449, -10557, 11280
  ]]},{title:"All-Pairs Shortest Paths", arr:[
    ["Standard", 341, 423, 567, -821, 1233, 1247, -10171, 10354, 10525, 10724, 10793, 10803, 10947, 11015, -11463, 12319
    ],["Variants", -104, 125, 186, 274, 436, -334, 869, 925, -1056, 1198, 11047
  ]]},{title:"Network Flow", arr:[
    ["Standard Max Flow Problem (Edmonds Karp's)", -259, -820, 10092, 10511, 10779, 11045, -11167, 11418
    ],["Variants", 10330, 10480, -11380, -11506, -12125
  ]]},{title:"Special Graphs (Others)", arr:[
    ["Tree", 112, 115, 122, 536, 548, 615, 699, 712, 839, 10308, -10459, 10701, -10805, 11131, 11234, 11615, -11695, 12186, 12347
    ],["Eulerian Graph", 117, 291, -10054, 10129, -10203, -10596
    ],["Bipartite Graph", 663, 670, 753, 1194, 10080, -10349, -11138, -11159, 11419, 12083, 12168
  ]]},{title:"Special Graph (Directed Acyclic Graph)", arr:[
    ["Single-Source Shortest/Longest Paths on DAG", 103, -452, 10000, 10051, 10259, -10285, -10350
    ],["Counting Paths in DAG", 825, 926, 986, -988, -10401, 10926, 11067, 11655, -11957
    ],["Converting General Graph to DAG", 590, -907, 910, 10201, 10543, 10681, 10702, 10874, -10913, 11307, -11487, 11545, 11782
  ]]}]},

  {title:"Mathematics", arr:
  [{title:"Ad Hoc Mathematics Problems", arr:[
    ["The Simpler Ones", 10055, 10071, 10281, 10469, -10773, 11614, -11723, 11805, -11875, 12149, 12502
    ],["Mathematical Simulation (Brute Force), easier", 100, 371, -382, 834, 906, -1225, 10035, -10346, 10370, 10783, 10879, 11150, 11247, 11313, 11689, 11877, 11934, 12290, 12527
    ],["Mathematical Simulation (Brute Force), harder", 493, 550, -616, 697, 846, 10025, 10257, 10624, -11130, -11254, 11968
    ],["Finding Pattern or Formula, easier", 10014, 10170, 10499, 10696, -10751, -10940, 11202, -12004, 12027
    ],["Finding Pattern or Formula, harder", 651, 913, -10161, 10493, 10509, 10666, 10693, 10710, 10882, 10970, 10994, -11231, 11246, 11296, 11298, 11387, 11393, -11718
    ],["Grid", -264, 808, 880, -10182, -10233, 10620, 10642, 10964
    ],["Number Systems or Sequences", 136, 138, 413, -443, 640, 694, 962, 974, 10006, -10042, 10049, 10101, -10408, 10930, 11028, 11063, 11461, 11660, 11970
    ],["Logarithm, Exponentiation, Power", 107, 113, 474, 545, -701, 1185, -10916, 11384, 11556, 11636, 11666, 11714, -11847, 11986, 12416
    ],["Polynomial", 126, 392, -498, 10215, -10268, 10302, 10326, -10586, 10719, 11692
    ],["Base Number Variants", -377, -575, 636, 10093, 10677, -10931, 11005, 11121, 11398, 12602
    ],["Just Ad Hoc", 276, 496, 613, -10137, 10190, 11055, 11241, -11526, 11715, 11816, -12036
  ]]},{title:"Java BigInteger Class", arr:[
    ["Basic Features", 424, 465, 619, -713, 748, 1226, 10013, 10083, 10106, 10198, 10430, 10433, 10494, 10519, -10523, 10669, 10925, 10992, 11448, 11664, 11830, -11879, 12143, 12459
    ],["Bonus Features: Base Number Conversion", 290, -343, 355, -389, 446, 10473, -10551, 11185, 11952
    ],["Bonus Features: Primality Testing", 960, -1210, -10235, 10924, -11287, 12542
    ],["Bonus Features: Others", -1230, 10023, 10193, 10464, -10814, -11821
  ]]},{title:"Combinatorics", arr:[
    ["Fibonacci Numbers", 495, 580, -763, 900, 948, 1258, 10183, -10334, 10450, 10497, 10579, -10689, 10862, 11000, 11089, 11161, 11780
    ],["Binomial Coefficients", 326, 369, 485, 530, 911, 10105, -10219, 10375, 10532, -10541, -11955
    ],["Catalan Numbers", -991, -10007, 10223, 10303, -10312, 10643
    ],["Others, Easier", 11115, -11310, -11401, 11480, -11597, 11609, 12463
    ],["Other, Harder", 1224, 10079, 10359, 10733, -10784, 10790, 10918, -11069, 11204, 11270, -11538, 11554, 12022
  ]]},{title:"Number Theory", arr:[
    ["Prime Numbers", 406, -543, 686, 897, 914, -10140, 10168, 10311, -10394, 10490, 10650, 10852, 10948, 11752
    ],["GCD and/or LCM", 106, 332, 408, 412, -10407, -10892, 11388, 11417, 11774, -11827, 12068
    ],["Factorial", -324, 568, -623, 10220, 10323, -10338
    ],["Finding Prime Factors", -516, -583, 10392, -11466
    ],["Working with Prime Factors", 160, 993, 10061, -10139, 10484, 10527, 10622, -10680, 10780, 10791, 11347, 11395, -11889
    ],["Functions involving Prime Factors", -294, 884, 1246, -10179, 10299, 10820, 10958, 11064, 11086, 11226, 11353, -11728, 12005
    ],["Modified Sieve", -10699, -10738, -10990, 11327, 12043
    ],["Modulo Arithmetic", 128, -374, 10127, 10174, -10176, -10212, 10489, 11029
    ],["Extended Euclid", -10090, -10104, 10633, -10673
    ],["Other Number Theory Problems", 547, 756, -10110, 10922, 10929, 11042, -11344, -11371
  ]]},{title:"Probability Theory", arr:[
    ["Standard", 542, 10056, 10218, 10238, 10328, -10491, -10759, 10777, 11021, -11176, 11181, 11346, 11500, 11628, 12024, 12114, 12457, 12461
  ]]},{title:"Cycle-Finding", arr:[
    ["Standard", 202, 275, -350, 944, 10162, 10515, 10591, 11036, -11053, 11549, -11634, 12464
  ]]},{title:"Game Theory", arr:[
    ["Standard", 847, -10111, 10165, 10368, 10404, 10578, -11311, -11489, 12293, 12469
  ]]}]},

  {title:"String Processing", arr:
  [{title:"Ad Hoc String Processing Problems - Part 1", arr:[
    ["Cipher/Encode/Encrypt/Decode/Decrypt, Easier", 245, 306, 444, 458, 483, 492, 641, 739, 795, 865, 10019, 10222, -10851, -10878, 10896, 10921, 11220, -11278, 11541, 11716, 11787, 11946
    ],["Cipher/Encode/Encrypt/Decode/Decrypt, Harder", 213, 468, -554, 632, 726, 740, 741, 850, 856, -11385, -11697
    ],["Frequency Counting", 499, 895, -902, 10008, 10062, -10252, 10293, 10374, 10420, 10625, 10789, -11203, 11577
    ],["Input Parsing (Non Recursive)", 271, 327, 391, 397, 442, 486, 537, 1200, -10906, 11148, -11357, -11878, 12543
    ],["Input Parsing (Recursive)", 384, 464, 620, -622, 743, -10854, 11070, -11291
    ],["Solvable with Java String/Pattern class (Regular Expression)", -325, -494, 576, -10058
  ]]},{title:"Ad Hoc String Processing Problems - Part 2", arr:[
    ["Output Formatting", 110, 159, 320, 330, 338, 373, 426, 445, -488, 490, 570, 645, 890, 1219, 10333, 10500, 10761, -10800, 10875, 10894, 11074, 11482, 11965, -12155, 12364
    ],["String Comparison", 409, -644, 671, 912, -11048, -11056, 11233, 11713, 11734
    ],["Just Ad Hoc", 153, 263, 892, -941, 1215, 1239, 10115, 10126, 10197, 10361, 10391, -10393, 10508, 10679, -11452, 11483, 11839, 11962, 12243, 12414
  ]]},{title:"String Matching", arr:[
    ["Standard", 455, 886, -10298, 11362, -11475, -11576, 11888, 12467
    ],["In 2D Grid", -422, 604, 736, -10010, -11283
  ]]},{title:"String Processing with Dynamic Programming", arr:[
    ["Classic", 164, -526, 531, 1207, 10066, 10100, -10192, 10405, -10635, 10739
    ],["Non Classic", 257, 10453, 10617, -11022, -11151, -11258, 11552, 
  ]]},{title:"Suffix Trie, Tree, Array", arr:[
    ["Standard", 719, -760, 1223, 1254, -11107, -11512
  ]]}]},

  {title:"(Computational) Geometry", arr:
  [{title:"Basic Geometry - Part 1", arr:[
    ["Points and Lines", 152, 191, 378, 587, 833, 837, -920, 1249, 10242, 10250, -10263, 10357, 10466, 10585, 10832, 10865, 10902, -10927, 11068, 11343, 11505, 11519, 11894
    ],["Triangles (plus Circles)", 121, 143, 190, 375, 438, 10195, 10210, 10286, 10347, 10387, 10522, -10577, 10792, 10991, -11152, 11164, 11281, 11326, 11437, 11479, 11579, 11854, -11909, 11936
  ]]},{title:"Basic Geometry - Part 2", arr:[
    ["Circles (only)", 1388, -10005, 10136, 10180, 10209, 10221, 10283, 10432, 10451, 10573, -10589, -10678, 12578
    ],["Quadrilaterals", 155, -460, 476, 477, -11207, 11345, 11455, 11639, 11800, -11834, 12256
    ],["3D Objects", -737, -815, -10297
  ]]},{title:"Polygon", arr:[
    ["Standard", 109, 137, 218, 361, 478, 596, 634, 681, 858, -1111, 1206, 10002, 10060, 10065, 10112, 10406, -10652, 11096, -11265, 11447, 11473, 11626
  ]]}]},

  {title:"More Advanced Topics", arr:
  [{title:"More Advanced Search Techniques", arr:[
    ["More Challenging Backtracking Problems", 131, 710, 711, 989, 1052, -10309, 10318, 10890, 10957, -11195, -11065, 11127, 11464, 11471
    ],["More Challenging State-Space Search with BFS or Dijkstra's", 321, 658, 928, -985, 1057, 1251, 1253, 10047, 10097, 10923, -11198, -11329, 11513, 11974, 12135
    ],["Meet in the Middle/A*/IDA*", 652, -1098, 1217, -10181, 11163, -11212
  ]]},{title:"Problem Decomposition", arr:[
    ["Two Components - Binary Search the Answer and Other", 714, 1221, 1280, 10372, 10566, 10606, 10668, 10804, 10816, -10983, -11262, -11516, 11646, 12428
    ],["Two Components - Involving DP 1D RSQ/RMQ", 967, 10200, 10533, 10871, -10891, -11105, -11408, 11491, 12028
    ],["Two Components - Graph Preprocessing and DP", -976, 10917, 10937, 10944, -11324, -11405, 11693, 11813
    ],["Two Components - Involving Graph", 273, 521, 1039, -1092, 1243, 1263, 10075, 10307, 11267, -11635, 11721, 11730, 12070, 12101, -12159
    ],["Two Components - Involving Mathematics", 1195, 10325, 10427, -10539, -10637, -10717, 11282, 11415, 11428
    ],["Two Components - Complete Search and Geometry", 142, 184, 201, 270, 356, 638, 688, -10012, 10167, 10301, 10310, 10823, -11227, 11515, -11574
    ],["Two Components - Mixed with Efficient Data Structure", 843, 922, 10734, -11474, -11525, -11960, 11966, 11967, 12318, 12460
    ],["Three Components", -295, 811, -1040, 1079, 1093, 1250, 10856, 10876, -11610
  ]]},{title:"More Advanced DP Techniques", arr:[
    ["DP level 2", -1172, -1211, 10069, 10081, 10364, 10419, 10536, 10651, 10690, 10898, -10911, 11088, 11832, 11218, 12324
    ],["DP level 3", 607, 702, 812, 882, -1231, -1238, 1240, 1244, 10029, 10032, 10154, 10163, 10164, 10271, 10304, 10604, 10645, 10817, 11002, 11084, 11285, -11391, 12030
    ],["DP level 4", 473, -1099, -1220, 1222, -1252, 10149, 10482, 10626, 10722, 11125, 11133, 11432, 11472
  ]]}]},

  {title:"Rare Topics", arr:
  [{title:"Rare Algorithms", arr:[
    ["Dinic's Algorithm", -11167
    ],["Formulas or Theorems", 10088, 10178, -10213, -10720, 10843, 11414, -11719
    ],["Gaussian Elimination", -11319
    ],["Great-Circle Distance", -535, -10316, 10897, -11817
    ],["Hopcroft Karp's Algorithm", -11138
    ],["Kosaraju's Algorithm", -11838
    ],["Matrix Power", 10229, -10518, -10655, 10870, -11486, 12470
    ],["Pollard's rho Integer Factoring Algorithm", -11476
    ],["Sliding Window", -1121, -11536
  ]]},{title:"Rare Problems", arr:[
    ["2-SAT Problem", -10319
    ],["Art Gallery Problem", -588, -10078, -10243
    ],["Bitonic TSP", -1096, -1347
    ],["Bracket Matching", -551, -673, -11111
    ],["Chinese Postman Problem", -10296
    ],["Closest Pair Problem", -10245, -11378
    ],["Graph Matching (non-bipartite)", -11439
    ],["Independent and Edge Disjoint Paths", -563, -1242
    ],["Inversion Index", 299, -612, -10327, 10810, 11495, -11858
    ],["Josephus Problem", 130, 133, 151, 305, 402, 440, 10015, -10771, -10774, -11351
    ],["Knight Moves", -439, -11643
    ],["Lowest Common Ancestor", -10938, -12238
    ],["Magic Square Construction (odd size)", -1266
    ],["Matrix Chain Multiplication", -348
    ],["Min Cost (Max) Flow", 10594, -10746, 10806, -10888, -11301
    ],["Min Path Cover on DAG", -1184, -1201
    ],["Pancake Sorting", -120
    ],["Postfix Calculator and Conversion", -727
    ],["Roman Numerals", -344, 759, -11616, -12397
    ],["Sorting in Linear Time", -11462
    ],["Tower of Hanoi", -10017
  ]]}]}
])

.factory('cpbook1_numbers', function (cpbook_1ed) {
  console.time('cpbook1_numbers');
  var ps = [];
  for (var cc=0; cc<cpbook_1ed.length; cc++){
    var c = cpbook_1ed[cc];
    for (var i=0; i<c.arr.length; i++){
      var sc = c.arr[i];
      for (var j=0; j<sc.arr.length; j++){
        var ssc = sc.arr[j];
        for (var k=1; k<ssc.length; k++){
          ps.push(ssc[k]);
        }
      }
    }
  }
  console.timeEnd('cpbook1_numbers');
  return ps;
})

.factory('cpbook2_numbers', function (cpbook_2ed) {
  console.time('cpbook2_numbers');
  var ps = [];
  for (var cc=0; cc<cpbook_2ed.length; cc++){
    var c = cpbook_2ed[cc];
    for (var i=0; i<c.arr.length; i++){
      var sc = c.arr[i];
      for (var j=0; j<sc.arr.length; j++){
        var ssc = sc.arr[j];
        for (var k=1; k<ssc.length; k++){
          ps.push(ssc[k]);
        }
      }
    }
  }
  console.timeEnd('cpbook2_numbers');
  return ps;
})

.factory('cpbook3_numbers', function (cpbook_3ed) {
  console.time('cpbook3_numbers');
  var ps = [];
  for (var cc=0; cc<cpbook_3ed.length; cc++){
    var c = cpbook_3ed[cc];
    for (var i=0; i<c.arr.length; i++){
      var sc = c.arr[i];
      for (var j=0; j<sc.arr.length; j++){
        var ssc = sc.arr[j];
        for (var k=1; k<ssc.length; k++){
          ps.push(ssc[k]);
        }
      }
    }
  }
  console.timeEnd('cpbook3_numbers');
  return ps;
})

.factory('uhunt_algorithmist', function() {
  var algorithmist_list = [
    119,
    10058,
    10306, 10341,
    10672,
    11235, 11292, 11450, 11506, 11512, 11517, 11947, 11974 ],
    algorithmist_exists = [], i;

  for (i = 0; i < algorithmist_list.length; i++) {
    algorithmist_exists[algorithmist_list[i]] = true;
  }

  return {
    exists: function(num) { return algorithmist_exists[num]; },
  };
})

.factory('uhunt_util', function () {
  function unescape_html(s) { return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#92;/g, '\\')
    .replace(/&#47;/g, '/')
    .replace(/&#39;/g, '\'');
  }
  return {
    parseInt: function (v) { v = parseInt(v, 10); return isNaN(v) ? 0 : v; },
    now: function () { return Math.floor(new Date().getTime() / 1000); },
    escape_html: function (s) { return s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/\\/g, '&#92;')
      .replace(/\//g, '&#47;')
      .replace(/'/g, '&#39;');
    },
    unescape_html: unescape_html,
    safe_parse_json: function (json_text) { return JSON.parse(unescape_html(json_text)); },
    MD5: function(e){function m(h,g){var j,i,n,l,k;n=h&2147483648;l=g&2147483648;j=h&1073741824;i=g&1073741824;k=(h&1073741823)+(g&1073741823);if(j&i)return k^2147483648^n^l;return j|i?k&1073741824?k^3221225472^n^l:k^1073741824^n^l:k^n^l}function o(h,g,j,i,n,l,k){h=m(h,m(m(g&j|~g&i,n),k));return m(h<<l|h>>>32-l,g)}function p(h,g,j,i,n,l,k){h=m(h,m(m(g&i|j&~i,n),k));return m(h<<l|h>>>32-l,g)}function q(h,g,j,i,n,l,k){h=m(h,m(m(g^j^i,n),k));return m(h<<l|h>>>32-l,g)}function r(h,g,j,i,n,l,k){h=m(h,m(m(j^
(g|~i),n),k));return m(h<<l|h>>>32-l,g)}function s(h){var g="",j="",i;for(i=0;i<=3;i++){j=h>>>i*8&255;j="0"+j.toString(16);g+=j.substr(j.length-2,2)}return g}var f=[],t,u,v,w,a,b,c,d;e=function(h){h=h.replace(/\r\n/g,"\n");for(var g="",j=0;j<h.length;j++){var i=h.charCodeAt(j);if(i<128)g+=String.fromCharCode(i);else{if(i>127&&i<2048)g+=String.fromCharCode(i>>6|192);else{g+=String.fromCharCode(i>>12|224);g+=String.fromCharCode(i>>6&63|128)}g+=String.fromCharCode(i&63|128)}}return g}(e);f=function(h){var g,
j=h.length;g=j+8;for(var i=((g-g%64)/64+1)*16,n=Array(i-1),l=0,k=0;k<j;){g=(k-k%4)/4;l=k%4*8;n[g]|=h.charCodeAt(k)<<l;k++}g=(k-k%4)/4;l=k%4*8;n[g]|=128<<l;n[i-2]=j<<3;n[i-1]=j>>>29;return n}(e);a=1732584193;b=4023233417;c=2562383102;d=271733878;for(e=0;e<f.length;e+=16){t=a;u=b;v=c;w=d;a=o(a,b,c,d,f[e+0],7,3614090360);d=o(d,a,b,c,f[e+1],12,3905402710);c=o(c,d,a,b,f[e+2],17,606105819);b=o(b,c,d,a,f[e+3],22,3250441966);a=o(a,b,c,d,f[e+4],7,4118548399);d=o(d,a,b,c,f[e+5],12,1200080426);c=o(c,d,a,b,f[e+
6],17,2821735955);b=o(b,c,d,a,f[e+7],22,4249261313);a=o(a,b,c,d,f[e+8],7,1770035416);d=o(d,a,b,c,f[e+9],12,2336552879);c=o(c,d,a,b,f[e+10],17,4294925233);b=o(b,c,d,a,f[e+11],22,2304563134);a=o(a,b,c,d,f[e+12],7,1804603682);d=o(d,a,b,c,f[e+13],12,4254626195);c=o(c,d,a,b,f[e+14],17,2792965006);b=o(b,c,d,a,f[e+15],22,1236535329);a=p(a,b,c,d,f[e+1],5,4129170786);d=p(d,a,b,c,f[e+6],9,3225465664);c=p(c,d,a,b,f[e+11],14,643717713);b=p(b,c,d,a,f[e+0],20,3921069994);a=p(a,b,c,d,f[e+5],5,3593408605);d=p(d,
a,b,c,f[e+10],9,38016083);c=p(c,d,a,b,f[e+15],14,3634488961);b=p(b,c,d,a,f[e+4],20,3889429448);a=p(a,b,c,d,f[e+9],5,568446438);d=p(d,a,b,c,f[e+14],9,3275163606);c=p(c,d,a,b,f[e+3],14,4107603335);b=p(b,c,d,a,f[e+8],20,1163531501);a=p(a,b,c,d,f[e+13],5,2850285829);d=p(d,a,b,c,f[e+2],9,4243563512);c=p(c,d,a,b,f[e+7],14,1735328473);b=p(b,c,d,a,f[e+12],20,2368359562);a=q(a,b,c,d,f[e+5],4,4294588738);d=q(d,a,b,c,f[e+8],11,2272392833);c=q(c,d,a,b,f[e+11],16,1839030562);b=q(b,c,d,a,f[e+14],23,4259657740);
a=q(a,b,c,d,f[e+1],4,2763975236);d=q(d,a,b,c,f[e+4],11,1272893353);c=q(c,d,a,b,f[e+7],16,4139469664);b=q(b,c,d,a,f[e+10],23,3200236656);a=q(a,b,c,d,f[e+13],4,681279174);d=q(d,a,b,c,f[e+0],11,3936430074);c=q(c,d,a,b,f[e+3],16,3572445317);b=q(b,c,d,a,f[e+6],23,76029189);a=q(a,b,c,d,f[e+9],4,3654602809);d=q(d,a,b,c,f[e+12],11,3873151461);c=q(c,d,a,b,f[e+15],16,530742520);b=q(b,c,d,a,f[e+2],23,3299628645);a=r(a,b,c,d,f[e+0],6,4096336452);d=r(d,a,b,c,f[e+7],10,1126891415);c=r(c,d,a,b,f[e+14],15,2878612391);
b=r(b,c,d,a,f[e+5],21,4237533241);a=r(a,b,c,d,f[e+12],6,1700485571);d=r(d,a,b,c,f[e+3],10,2399980690);c=r(c,d,a,b,f[e+10],15,4293915773);b=r(b,c,d,a,f[e+1],21,2240044497);a=r(a,b,c,d,f[e+8],6,1873313359);d=r(d,a,b,c,f[e+15],10,4264355552);c=r(c,d,a,b,f[e+6],15,2734768916);b=r(b,c,d,a,f[e+13],21,1309151649);a=r(a,b,c,d,f[e+4],6,4149444226);d=r(d,a,b,c,f[e+11],10,3174756917);c=r(c,d,a,b,f[e+2],15,718787259);b=r(b,c,d,a,f[e+9],21,3951481745);a=m(a,t);b=m(b,u);c=m(c,v);d=m(d,w)}return(s(a)+s(b)+s(c)+
s(d)).toLowerCase()},

  }
})

.factory('uhunt_http', function ($http, $timeout) {
  return function ajax(method, url, params, cb) {
    $http({ method:method, url:url, params:params, cache:false, timeout:55000 })
      .success(cb)
      .error(function() { $timeout(function () { ajax(method, url, params, cb); }, 10000); });
  };
})

.factory('uhunt_rpc', function (uhunt_http, uhunt_util, uhunt_api_url, uhunt_web_url) {
  return {
    // Goes to uhunt_web_url. It is proprietary, do not use it!
    spoll: function(poll_sesid, ids, cb) { uhunt_http('GET', uhunt_web_url + '/poll/' + poll_sesid + '/' + JSON.stringify(ids), { }, cb); },
    whos_here: function(room, cb) { uhunt_http('GET', uhunt_web_url + '/chat/whos_here/' + room, { }, cb); },
    chat_post: function (poll_sesid, text, cb) { uhunt_http('POST', uhunt_web_url + '/chat/post/' + poll_sesid, { text: text }, cb); },
    vcontest_gen: function(c, cb) { uhunt_http('POST', uhunt_web_url + '/vcontest-gen', c, cb); },
    logout: function(poll_sesid, cb) { uhunt_http('POST', uhunt_web_url + '/chat/logout/' + poll_sesid, { }, cb); },
    login: function (poll_sesid, uname, digest, ts, invi, cb) { uhunt_http('POST', 
      uhunt_web_url + '/chat/login/' + poll_sesid + '/' + uname + '/' + digest + '/' + ts + '/' + invi, { }, cb); },

    udebug: function(cb) { uhunt_http('GET', 'http://www.udebug.com/api/UVa', { }, cb); },

    // Goes to uhunt_api_url.
    cpbook: function(version, cb) { uhunt_http('GET', uhunt_api_url + '/api/cpbook/' + version, { }, cb); },
    poll: function(poll_id, cb) { uhunt_http('GET', uhunt_api_url + '/api/poll/' + poll_id, { }, cb); },
    problem_by_num : function(pnum, cb) { uhunt_http('GET', uhunt_api_url + '/api/p/num/' + pnum, { }, cb); },
    problems: function (cb) { uhunt_http('GET', uhunt_api_url + '/api/p', { }, cb); },
    psubs: function (pids, sbt_lo, sbt_hi, cb) { uhunt_http('GET', uhunt_api_url + '/api/p/subs/' + pids.join(',') + '/' + sbt_lo + '/' + sbt_hi, { }, cb); },
    psubs_limit: function (pid, sbt_lo, sbt_hi, limit, cb) { uhunt_http('GET', uhunt_api_url + '/api/p/subs/' + pid + '/' + sbt_lo + '/' + sbt_hi + '/' + limit, { }, cb); },
    subs_since: function (uid, sid, cb) { uhunt_http('GET', uhunt_api_url + '/api/subs-user/'+uid, { sid: sid }, cb); },
    subs_pids: function (uids, pids, cb) { uhunt_http('GET', uhunt_api_url + '/api/subs-pids/' + uids.join(',') + '/' + pids.join(',') + '/0', { }, cb); },
    subs_nums : function(uids, pnums, cb){ uhunt_http('GET', uhunt_api_url + '/api/subs-nums/' + uids.join(',') + '/' + pnums.join(',') + '/0', { }, cb); },
    ranklist: function(uid, nabove, nbelow, cb) { uhunt_http('GET', uhunt_api_url + '/api/ranklist/'+uid+'/'+nabove+'/'+nbelow, { }, cb); },
    pranknearby: function(pid, uid, nabove, nbelow, cb) { uhunt_http('GET', uhunt_api_url + '/api/p/ranklist/'+pid+'/'+uid+'/'+nabove+'/'+nbelow, { }, cb); },
    prank: function(pid, start, count, cb) { uhunt_http('GET', uhunt_api_url + '/api/p/rank/'+pid+'/'+start+'/'+count, { }, cb); },
    subs_count: function (pid, sbt, back, jump, cb) { uhunt_http('GET', uhunt_api_url + '/api/p/count/'+pid+'/'+sbt+'/'+back+'/'+jump, { }, cb); },
    solved_bits: function(unames, cb) {
      if (uhunt_util.parseInt(unames[0]) === unames[0]) {
        uhunt_http('GET', uhunt_api_url + '/api/solved-bits/' + unames.join(','), { }, cb);
      } else {
        uhunt_http('GET', uhunt_api_url + '/api/solved-bits', { unames: JSON.stringify(unames) }, cb);
      }
    },
  };
})

// To make sure the local time is later than server time (so no negative time shown).
.factory('uhunt_delta_time', function (uhunt_util) {
  var delta_time = 0;
  return {
    get: function () { return delta_time; },
    adjust: function (t) { delta_time = Math.max(delta_time || 0, t - uhunt_util.now()); },
  }
})

// Creates new User object that maintains its statistics.
.factory('uhunt_create_user', function ($timeout) {
  return function (uid) {
    var pid_key = {}; // index by pid, then by sid : pid_key[pid][sid] = {ver,run,mem,sbt,lan}
    var pid_stats = {}; // the stats of this pid : ac, nos, ntry, last_sbt, rank, first_ac_sbt, mrun, mmem
    var sid2pid = {}; // index by sid; sid2pid[sid] = pid
    var sids = [];
    var sorted_sids = true;  // the list of sids, and the sorted flag
    var name = false;
    var uname = false;
    var listener = [];

    function on(event, func) {
      if (event == 'update') listener.push(func);
      if (sids.length) func(); // There has been update.
    }

    function notify_all() {
      console.log('uhunt_user.update ' + listener.length);
      for (var i = 0; i < listener.length; i++) listener[i]();
    }

    // retrieve the last submission id of the current user
    function lastId() { return (sids.length > 0) ? sids[sids.length-1] : 0; }

    function set_name(_name) { name = _name; }
    function set_uname(_uname) { uname = _uname; }

    // new submissions should update this wrapper using this method
    function update(s) {
      // console.log(s);
      if (!name) set_name(s.name);
      if (!uname) set_uname(s.uname);
      if (!pid_key[s.pid]) { pid_key[s.pid] = {}; }
      pid_stats[s.pid] = false;   // reset the stats when this pid is updated
      pid_key[s.pid][s.sid] = s;
      if (!sid2pid[s.sid]) {
        if (sorted_sids && s.sid < lastId()) { sorted_sids = false; }
        sids.push(s.sid);
      }
      sid2pid[s.sid] = s.pid;
    }

    // loop through all problem ids contained in this user's submissions
    function each_pid(pid, f) {
      if (typeof pid == 'function') {
        for (var i in pid_key) if (pid_key.hasOwnProperty(i)) pid(i);
      } else if (pid_key[pid]) {
        var sids = pid_key[pid];
        for (var sid in sids) if (sids.hasOwnProperty(sid)) f(sid, sids[sid]);
      }
    }

    // return a statistics of the problem submitted by the user
    function stats(pid) {
      if (pid_stats[pid]) { return pid_stats[pid]; }
      var st = { ac:false, nos:0, ntry:0, last_sbt:-1e100,
        rank:1e100, first_ac_sbt:1e100, mrun:1e100, mmem:1e100 };
      var p = pid_key[pid]; if (!p) { return st; }
      var sid;
      for (sid in p){
        var s = p[sid];
        st.nos++;
        st.last_sbt = Math.max(st.last_sbt, s.sbt);
        if (s.ver === 90){ // 90 means accepted
          st.ac = true;
          st.first_ac_sbt = Math.min(st.first_ac_sbt, s.sbt);
          st.mrun = Math.min(st.mrun, s.run);
  //        st.mmem = Math.min(st.mmem, s.mem);
          st.rank = Math.min(st.rank, s.rank);
        }
      }
      if (!st.ac) { st.ntry = st.nos; } // all the subs are the number of try
      else { each_pid(pid, function(sid,s){ if (s.sbt < st.first_ac_sbt) { st.ntry++; } }); } // ntry before ac
      pid_stats[pid] = st;
      return st;
    }

    // the number of submissions of the user
    function nos(){ return sids.length; }

    // the histogram of various verdicts
    function substats_count() {
      var cnt = {}, pid, sid;
      for (pid in pid_key) if (pid_key.hasOwnProperty(pid)) {
        var p = pid_key[pid];
        for (sid in p){
          var s = p[sid];
          if (!cnt[s.ver]) { cnt[s.ver] = 0; }
          cnt[s.ver]++;
        }
      }
      return cnt;
    }

    // loop through the last 'n' submissions of this user
    function each_last_subs(n, f) {
      if (!sorted_sids){
        sorted_sids = true;
        sids.sort(function(a,b){ return a-b; });
      }
      var i;
      for (i=0; i<n && i<sids.length; i++){
        var sid = sids[sids.length-i-1];
        var pid = sid2pid[sid];
        f(i,sid,pid,pid_key[pid][sid]);
      }
    }

    return {
      uid: uid,
      on: on,
      update: update,
      notify_all: notify_all,
      lastId: lastId,
      each_pid: each_pid,
      stats: stats,
      nos: nos,
      substats_count: substats_count,
      each_last_subs: each_last_subs,
      set_name: set_name,
      set_uname: set_uname,
      name: function(){ return name; },
      uname: function(){ return uname; }
    };
  };
})

// The currently logged in user.
// .factory('uhunt_user', function (uhunt_create_user, uhunt_rpc, uhunt_user_uid) {
//   var user = uhunt_create_user(uhunt_user_uid);
//   uhunt_rpc.subs_since(uhunt_user_uid, 0, function (res) {
//     user.set_name(res.name);
//     user.set_uname(res.uname);
//     var arr = res.subs;
//     for (var i = 0; i < arr.length; i++){ 
//       var s = arr[i];
//       user.update({ sid:s[0], pid:s[1], ver:s[2], run:s[3], sbt:s[4], lan:s[5], rank:s[6] });
//     }
//   });
//   return user;
// })

// Stores values that persist across page reload.
.factory('uhunt_db', function (uhunt_util) {
  var keys = { // List of valid keys to store and its type.
    'uhunt_prob_search_max_subs': 'int',
    'uhunt_prob_search_max_rank': 'int',
    'uhunt_prob_search_show_last': 'string',
    'uhunt_prob_search_subs_top': 'string',
    'show_last_submissions': 'int',
    'show_livesubs': 'bool',
    'livesubs_table_display': 'bool',
    'last_problem_reload': 'int',
    'last_udebug_reload': 'int',
    'probs': 'json',
    'udebug': 'json',
    'username': 'string',
    'chat_invisible': 'bool',
    'uhunt_series_user_filter': 'json',
    'uhunt_widget_user_filter_chk': 'bool',
    'uhunt_widget_highlight_uids_chk': 'bool',
    'uhunt-code': 'string',
    'logged-in': 'bool',
    'livesub-nshow': 'int',
    'series_index': 'int',
    'cpbook_show': 'string',
    'cpbook_chapter': 'int',
    'cpbook_edition': 'int',
    'show_live_submissions': 'int',
    'vcshadow-view': 'string',
    'vcshadow-sortby': 'string',
    'vcshadow-sortasc': 'bool',
    'vcshadow-n': 'int',
    'show_solved': 'string',
    'sort_desc': 'bool',
    'sort_column': 'string',
    'np_view_which': 'int',
    'show_next_problems': 'int',
    'selected_volume': 'int',
    'ranklist-nabove': 'int',
    'ranklist-nbelow': 'int',
    'cmp_expr': 'string',
    'generate-number': 'int',
    'show_search_result': 'bool',
    'vcontest_picker_show_unsolved': 'bool',
    'uhunt_vcontest_uids': 'string',
  };

  return {
    set: function(key, val){
      if (val === null || val === undefined) alert('Sets db to null/undefined for ' + key);
      try {
        switch (keys[key]) {
          case 'int': localStorage[key] = val; break;
          case 'string': localStorage[key] = val; break;
          case 'bool': localStorage[key] = val? '1' : '0'; break;
          case 'json': localStorage[key] = JSON.stringify(val); break;
          default: alert('Set key not defined: ' + key); break;
        }
      } catch (e){
        console.error(JSON.stringify(e));
      }
    },
    get: function(key){
      switch (keys[key]) {
        case 'int': return uhunt_util.parseInt(localStorage[key]);
        case 'string': return localStorage[key];
        case 'bool': return localStorage[key] === '1';
        case 'json': 
          var val = localStorage[key];
          return val? JSON.parse(localStorage[key]) : null;
        default: alert('Get key not defined: ' + key); break;
      }
    },
    exists: function (key) {
      return localStorage[key] !== null && localStorage[key] !== undefined;
    },
    unset: function (key) {
      localStorage.removeItem(key);
    }
  };
})

.factory('uhunt_listeners', function () {
  function Listener() { this.listeners = []; }
  Listener.prototype.listen = function (f) { this.listeners.push(f); };
  Listener.prototype.notify = function () {
    for (var i = 0; i < this.listeners.length; i++) {
      this.listeners[i].apply(null, arguments);
    }
  };
  return Listener;
})

.factory('uhunt_poll', function ($timeout, $filter, uhunt_user, uhunt_util, uhunt_problems, uhunt_initial_poll, uhunt_rpc, uhunt_use_session, uhunt_max_live_submissions, uhunt_delta_time, uhunt_chat_room, uhunt_listeners) {
  var subs = [];              // Contains last submissions.
  var uhunt_chats = [];
  var out_of_sync = 0;
  var uhunt_format_ms = $filter('uhunt_format_ms');
  var problem_filter = $filter('uhunt_problem');
  var new_submissions_listeners = new uhunt_listeners();
  var new_session_listeners = new uhunt_listeners();

  var config = {
    poll_sesid: 0,
    live_submissions: subs,
    uhunt_chats: uhunt_chats,
    whos_here: { "users": [], "server":1366577487063, "count":0 },
    on_new_session: function (f) { new_session_listeners.listen(f); },
    on_new_submissions: function (f) { new_submissions_listeners.listen(f); },
    update_whos_here: whos_here,
    insert_sub: insert_sub,
  }

  var ids = { lastsubs: 0, uid: uhunt_user.uid };  // The last poll id.
  ids[uhunt_chat_room] = 0;

  (function start_poll() {
    if (uhunt_problems.ready()) { // Do initialize the poll when the problems are ready.
      uhunt_initial_poll = uhunt_util.safe_parse_json(uhunt_initial_poll);
      for (var i = 0; i < uhunt_initial_poll.length; i++) add_submission(uhunt_initial_poll[i]);
       poll(); // Start periodic poll.
      console.log('periodic poll started');
    } else {
      console.log('start_poll delayed');
      setTimeout(start_poll, 100);
    }
  })();

  function insert_sub(subs, sub, cap) {
    for (var i = 0; i < subs.length; i++) {
      if (sub.sid > subs[i].sid) return subs.splice(i, 0, sub);   // New submission.
      if (sub.sid == subs[i].sid) return subs[i] = sub;           // Update existing submission.
    }
    if (subs.length < cap) subs.push(sub);                   // New submission.
    if (subs.length > cap) subs.splice(subs.length, subs.length - cap);
  }

  function add_submission(sub) {
    // console.log(sub.id + ' ' + JSON.stringify(sub));
    if (ids.lastsubs && ids.lastsubs + 1 != sub.id) {
      console.error('lastsubs out of sync ' + (ids.lastsubs + 1) + ' != ' + sub.id);
      out_of_sync = 1;
    }
    ids.lastsubs = sub.id;
    if (typeof sub.sid !== 'number') return console.error('Invalid submission: ' + JSON.stringify(sub));
    sub.p = uhunt_problems.pid(sub.pid);
    uhunt_delta_time.adjust(sub.sbt);
    insert_sub(subs, sub, uhunt_max_live_submissions);
  }

  function numbers_to_discussions(m) {
    var s = '', i, k, msg = m.split(' ');
    for (i = 0; i < msg.length; i++){
      var prefix = '', suffix = '';
      for (k = 0; k < msg[i].length; k++){
        var ch = msg[i].charAt(k);
        if (suffix.length > 0) { suffix += ch; }
        else if (('0'<=ch && ch<='9') || ('a'<=ch && ch<='z') || ('A'<=ch && ch<='Z')) { prefix += ch; }
        else { suffix += ch; }
      }
      if (i>0) { s += ' '; }
      if (uhunt_problems.num(prefix)){
        var p = uhunt_problems.num(prefix);
        s += '<a class="' + problem_filter(p.pid, 'classes') + '" href="' + problem_filter(p.pid, 'link') + '" target="_blank">' + p.num + '</a> (' +
          '<a href="http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=problem_stats&problemid=' + p.pid + '&category=24" target="_blank" class="nou">r</a>|' +
          '<a href="http://acm.uva.es/board/search.php?keywords=' + p.num + '" class="nou" target="_blank">d</a>)' + uhunt_util.escape_html(suffix);
      } else {
        s += uhunt_util.escape_html(msg[i]);
      }
    }
    return s;
  }

  function format_chat_message(chat) {
    if (chat.userid == 14031984) {
      var v = JSON.parse(chat.message);
      if (v.rank1pid) {
        var p = uhunt_problems.pid(v.rank1pid);
        if (p) {
          return chat.message = '<tt style="color:green; font-size:12px"><i>uHunt</i>&gt; ' +
            '<a href="/u/' + uhunt_util.escape_html(v.uname) + '" style="font-weight:bold; color: green; text-decoration:none">' + 
            uhunt_util.escape_html(v.uname) + '</a> gets <b>Rank 1</b> for ' +
            numbers_to_discussions(p.num + '') + (v.run? (' at ' + uhunt_format_ms(v.run) + 's') : '') + '</tt>';
        }
      } else {
        console.error(chat);
      }
    }
    var d = new Date(chat.post_ts);
    var h = d.getHours(); if (h < 10) h = '0' + h;
    var m = d.getMinutes(); if (m < 10) m = '0' + m;
    var s = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + h + ':' + m;
    return  chat.message = '<a target="_blank" style="text-decoration:none; font-weight:bold; font-style:italic" href="' + 
      '/id/'+ chat.userid+'" title="Posted on '+ s +'">' + uhunt_util.escape_html(chat.uname) + '</a>&gt; ' + numbers_to_discussions(chat.message);
  }

  function add_chat(chat) {
    format_chat_message(chat);
    if (ids[uhunt_chat_room] && ids[uhunt_chat_room] + 1 != chat.id) {
      // console.error('CHAT OUT OF SYNC ' + (ids[uhunt_chat_room] + 1) + ' != ' + chat.id);
    }
    ids[uhunt_chat_room] = chat.id;
    // console.log(chat);
    if (uhunt_chats.length < 1000) uhunt_chats.push(chat);
    if (uhunt_chats.length > 1000) uhunt_chats.splice(uhunt_chats.length, uhunt_chats.length - 1000);
  }

  function process1(data) {
    if (data['lastsubs']) {
      var arr = data['lastsubs'];
      var has_update = false;
      for (var i = 0; i < arr.length; i++) {
        add_submission(arr[i]);
        if (arr[i].uid == uhunt_user.uid) {
          uhunt_user.update(arr[i]);
          has_update = true;
        }
      }
      if (arr.length > 0) new_submissions_listeners.notify(arr);
      if (has_update) uhunt_user.notify_all();
      if (out_of_sync === 1) {
        out_of_sync = 2;
        uhunt_rpc.subs_since(uhunt_user.uid, uhunt_user.lastId(), function (res) {
          var arr = res.subs;
          for (var i = 0; i < arr.length; i++){ 
            var s = arr[i];
            uhunt_user.update({ sid:s[0], pid:s[1], ver:s[2], run:s[3], sbt:s[4], lan:s[5], rank:s[6] });
          }
          out_of_sync = 0;
          console.log('submissions is now in sync');
        });
      }
    }
    if (data[uhunt_chat_room]) {
      var arr = data[uhunt_chat_room];
      for (var i = 0; i < arr.length; i++) add_chat(arr[i]);
    }
  }

  function process2(data) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].type == 'lastsubs') add_submission(data[i].msg);
      else if (data[i].type == 'chat') add_chat(data[i].msg);
      else continue;
    }
    if (data.length > 0) poll_id = data[data.length - 1].id;
  }

  function since_cmp(a, b) {
    var A = a.uname.toLowerCase();
    var B = b.uname.toLowerCase();
    return A < B ? -1 : (A > B ? 1 : 0);
  }

  var whos_here_promise = true;
  function whos_here() { // Refresh every 1 minute.
    $timeout.cancel(whos_here_promise);
    uhunt_rpc.whos_here(uhunt_chat_room, function (data) {
      config.whos_here.count = data.count;
      config.whos_here.server = data.server;
      config.whos_here.users.length = 0;
      for (var uid in data) if (data.hasOwnProperty(uid)) {
        if (uid == 'count' || uid == 'server') continue;
        config.whos_here.users.push(data[uid]);
      }
      config.whos_here.users.sort(since_cmp);
      whos_here_promise = $timeout(whos_here, 60000);
    });
  }
  whos_here();

  function poll() { // Refresh every 1 second with long polling.
    if (uhunt_use_session) {
      uhunt_rpc.spoll(config.poll_sesid, ids, function (data) {
        if (config.poll_sesid != data.sesid) {
          config.poll_sesid = data.sesid;
          new_session_listeners.notify();
        }
        // console.log('poll ' + ids.lastsubs);
        process1(data.msgs);
        $timeout(poll, 1000);
      });
    } else {
      uhunt_rpc.poll(poll_id, function (data) {
        process2(data);
        $timeout(poll, 1000);
      });
    }
  };

  return config;
})

// Provides the uDebug problem database.
.factory('uhunt_udebug', function (uhunt_rpc, uhunt_db, uhunt_util) {
  var num_key = {}; // index by problem number (localid)
  var refresh = 0;

  var obj = {
    reload: reload,
    version: 0,
    exists: function(num) {
      return num_key.hasOwnProperty(num);
    },
  };

  // Parse raw data from the API and update this wrapper.
  function parse(arr) {
    for (var i = 0; i < arr.length; i++){
      num_key[arr[i]] = true;
    }
  }

  // Refresh the global statistics of all problems.
  function reload() {
    if (refresh) return; else refresh = 1; // Prevent duplicate reloads.
    console.log('Reloading udebug problems');
    uhunt_rpc.udebug(function (arr) {
      parse(arr);
      uhunt_db.set('udebug', arr);
      uhunt_db.set('last_udebug_reload', uhunt_util.now());
      refresh = 0;
      obj.version++;
    });
  }

  // Update problem statistics once a day.
  var last_udebug_reload = uhunt_util.now() - uhunt_db.get('last_udebug_reload');
  if (last_udebug_reload < 0 || last_udebug_reload > 24 * 60 * 60 * (1 + Math.random() * 0)) reload();

  // Try initialize the udebug problems from cache if exists.
  var problem_json = uhunt_db.get('udebug');
  if (problem_json) {
    console.log('load udebug from db');
    parse(problem_json);
  }

  return obj;
})

// Provides the problem database.
.factory('uhunt_problems', function (uhunt_rpc, uhunt_db, uhunt_util) {
  var pid_key = {}; // index by pid
  var num_key = {}; // index by problem number (localid)
  var lastId = 0;   // the largest problem id
  var refresh = 0;
  var on_ready = [];

  var obj = {
    parse: parse,
    reload: reload,
    version: 0,

    ready: function () { return pid_key.hasOwnProperty(36); },

    level: function(dacu) { return 10 - Math.floor(Math.min(10, Math.log(dacu))); },

    // Returns the problem object by problem number.
    num: function(num){
      if (!num_key.hasOwnProperty(num)) { return false; }
      return num_key[num];
    },

    // Returns the problem object by problem id, if not exists.
    pid: function(pid) {
      if (!pid_key.hasOwnProperty(pid)) {
        // if (!pid) throw new Error('no pid');
        // console.error('pid does not exist: ' + pid);
        // throw new Error(pid);
        reload();
        return null;
       }
      return pid_key[pid];
    },

    // Returns the last problem id.
    lastId: function() { return lastId; },

    // Loop through all the problems.
    each: function(f) { for (var pid in pid_key) if (pid_key.hasOwnProperty(pid)) f(pid, pid_key[pid]); },

    ready_listener: function(f) { if (obj.version > 0) f(); else on_ready.push(f); }
  };

  // Parse raw data from the API and update this wrapper.
  function parse(arr) {
    for (var i = 0; i < arr.length; i++){
      var a = arr[i], p = { pid:a[0], num:a[1], tit:a[2], dacu:a[3], mrun:a[4], mmem:a[5],
        nover:a[6], sube:a[7], cbj:a[8], inq:a[9], ce:a[10], rf:a[11], re:a[12],
        ole:a[13], tle:a[14], mle:a[15], wa:a[16], pe:a[17], ac:a[18], rtl:a[19], status:a[20], nos:0 };
      for (var j = 0; j < 13; j++) { p.nos += a[6 + j]; }
      p.panos = Math.floor(p.ac / p.nos * 100);
      pid_key[p.pid] = num_key[p.num] = p;
      lastId = Math.max(lastId, p.pid);
    }
  }

  // Refresh the global statistics of all problems.
  function reload() {
    if (refresh) return; else refresh = 1; // Prevent duplicate reloads.
    console.log('Reloading problems');
    uhunt_rpc.problems(function (arr) {
      parse(arr);
      uhunt_db.set('probs', arr);
      uhunt_db.set('last_problem_reload', uhunt_util.now());
      refresh = 0;
      obj.version++;
      for (var i = 0; i < on_ready.length; i++) on_ready[i]();
    });
  }

  // Update problem statistics once a day.
  var last_problem_reload = uhunt_util.now() - uhunt_db.get('last_problem_reload');
  if (last_problem_reload < 0 || last_problem_reload > 24 * 60 * 60 * (1 + Math.random() * 0)) reload();

  // Try initialize the problems from cache if exists.
  var problem_json = uhunt_db.get('probs');
  if (problem_json) {
    console.log('load problems from db');
    parse(problem_json);
    obj.version++;
  }

  return obj;
})





angular.module('uHunt.controllers', [])

.controller('ChatCtrl', function ($scope, uhunt_rpc, uhunt_db, uhunt_util, uhunt_poll, $window, uhunt_web_url) {
  console.time('ChatCtrl');
  $scope.messages = uhunt_poll.uhunt_chats;
  $scope.whos_here = uhunt_poll.whos_here;
  $scope.username = uhunt_db.get('username');
  $scope.password = uhunt_db.get('uhunt-code');
  $scope.is_invisible = uhunt_db.get('chat_invisible');
  $scope.signed_in_user = '[ Sign In ]';
  $scope.logging_in = false;
  $scope.is_logged_in = false;
  $scope.post_text = '';

  $scope.toggle_invisible = function () {
    $scope.is_invisible = !$scope.is_invisible;
    uhunt_db.set('chat_invisible', $scope.is_invisible);
  };

  $scope.sign_in = function () {
    if (!$scope.password || $scope.password.trim().length == 0) return;
    $scope.logging_in = true;
    var ts = new Date().getTime();
    var digest = uhunt_util.MD5(ts + ';' + $scope.password);
    uhunt_rpc.login(uhunt_poll.poll_sesid, $scope.username, digest, ts, $scope.is_invisible, function (ok) {
      console.log($scope.username + ' login = ' + ok);
      if (ok === 'ok') {
        uhunt_db.set('username', $scope.username);
        uhunt_db.set('uhunt-code', $scope.password);
        uhunt_db.set('logged-in', true);
        $scope.signed_in_user = '[ ' + $scope.username + ' ]';
        $scope.show_login_dialog = false;
        $scope.is_logged_in = true;
        $scope.signed_in_as = $scope.username;
      } else if (ok === 'invalid code') {
        alert('Invalid UVa username / uHunt code');
        $scope.signed_in_user = '[ Sign In ]';
        uhunt_db.set('logged-in', false);
      }
      $scope.logging_in = false;
      uhunt_poll.update_whos_here();
    });
  };

  $window.onbeforeunload = function () {
    var xhr = new XMLHttpRequest();
    if (!xhr) return;
    xhr.open("post", uhunt_web_url + '/chat/leave/' + uhunt_poll.poll_sesid, false);
    xhr.send();
  };

  uhunt_poll.on_new_session(function () {
    if (uhunt_db.get('logged-in')) $scope.sign_in();
  });

  $scope.sign_out = function () {
    $scope.logging_in = true;
    uhunt_rpc.logout(uhunt_poll.poll_sesid, function (ok) {
      console.log($scope.username + ' logout = ' + ok);
      uhunt_db.set('logged-in', false);
      $scope.is_logged_in = false;
      $scope.signed_in_user = '[ Sign In ]';
      $scope.logging_in = false;
      uhunt_poll.update_whos_here();
    });
  };

  $scope.post_message = function () {
    if ($scope.post_text.length > 255) {
      alert("Your message is "+ ($scope.post_text.length - 255) + " characters too long.");
    } else if ($scope.post_text.length > 0 && !$scope.post_chat_disabled) {
      $scope.post_chat_disabled = true;
      uhunt_rpc.chat_post(uhunt_poll.poll_sesid, $scope.post_text, function (res) {
        if (res == 'ok') {
          $scope.post_text = '';
        } else if (res === 'need login') {
          alert('You need to sign in to post a message');
          $scope.show_login_dialog = true;
        } else {
          alert('Error connecting to the server');
        }
        $scope.post_chat_disabled = false;
      });
    }
    return false;
  };
  console.timeEnd('ChatCtrl');
})


.controller('LiveSubmissionsCtrl', function ($scope, $timeout, uhunt_db, uhunt_poll, uhunt_problems, uhunt_algorithmist, uhunt_udebug) {
  $scope.limit = uhunt_db.get('livesub-nshow') || 5;
  $scope.set_limit = function (n) {
    uhunt_db.set('livesub-nshow', n);
    $scope.limit = n;
  };

  $scope.show = uhunt_db.exists('show_livesubs') ? uhunt_db.get('show_livesubs') : true;
  $scope.set_show = function (show) {
    uhunt_db.set('show_livesubs', show);
    $scope.show = show;
  };

  $scope.algorithmist_width = function (num) {
    return (uhunt_algorithmist.exists(num) ? 15 : 0) + (uhunt_udebug.exists(num) ? 30 : 0);
  };

  $scope.live_submissions = uhunt_poll.live_submissions;

  (function tick() { $timeout(function () { $scope.$apply(); tick(); }, 1000); })();
})

.controller('ProblemSearchCtrl', function ($scope, uhunt_problems, uhunt_user, uhunt_rpc, uhunt_db, uhunt_util, uhunt_poll) {
  console.time('ProblemSearchCtrl');
  $scope.your_last_submissions = [];
  $scope.search_number = uhunt_db.get('generate-number') || '';
  $scope.show_search_result = uhunt_db.get('show_search_result') || false;
  $scope.search = search;
  $scope.max_last_subs = uhunt_db.get('uhunt_prob_search_max_subs') || 5;
  $scope.show_last = uhunt_db.get('uhunt_prob_search_show_last') || 'last';
  $scope.max_rank = uhunt_db.get('uhunt_prob_search_max_rank') || 5;
  $scope.show_top = uhunt_db.get('uhunt_prob_search_subs_top') || 'top';
  $scope.uhunt_problems = uhunt_problems;

  $scope.hide = function () { uhunt_db.set('show_search_result', $scope.show_search_result = false); };
  $scope.is_valid_search = function () { return uhunt_problems.num($scope.search_number) && $scope.show_search_result; };
  $scope.font_weight = function (sub) { return sub.uid == uhunt_user.uid ? 'bold' : ''; };

  $scope.set_max_last_subs = function (n) {
    uhunt_db.set('uhunt_prob_search_max_subs', n);
    $scope.max_last_subs = n;
    search();
  };

  $scope.set_show_last = function (show) {
    uhunt_db.set('uhunt_prob_search_show_last', show);
    $scope.show_last = show;
    search();
  };

  $scope.set_max_rank = function (amt) {
    uhunt_db.set('uhunt_prob_search_max_rank', amt);
    $scope.max_rank = amt;
    search();
  };

  $scope.set_show_top = function (show) {
    uhunt_db.set('uhunt_prob_search_subs_top', show);
    $scope.show_top = show;
    search();
  };

  $scope.$watch('search_number', search);
  $scope.$watch('uhunt_problems.version', function () { search(); });
  uhunt_user.on('update', function () { search(); });

  function update_ranklist(arr) { $scope.ranklist = arr; }
  function sbt_cmp(a,b) { return b.sbt - a.sbt; }
  function search(newVal, oldVal) {
    console.log('search' +
      ', new=' + newVal + ', old=' + oldVal +
      ', num=' + $scope.search_number + 
      ', p=' + uhunt_problems.num($scope.search_number) +
      ', valid=' + $scope.is_valid_search());
    if (newVal && newVal != oldVal) $scope.show_search_result = true;
    if (!$scope.is_valid_search()) return;
    var p = uhunt_problems.num($scope.search_number);
    if (p){
      var v = Math.floor(p.num/100);
      $scope.ext_problem_url1 = 'http://uva.onlinejudge.org/external/'+v+'/'+p.num+'.html';
      $scope.ext_problem_url2 = 'http://acm.uva.es/p/v'+v+'/'+p.num+'.html';
      $scope.problem_url = 'http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=24&page=show_problem&problem='+p.pid;
      $scope.submit_url = 'http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=submit_problem&problemid='+p.pid+'&category=24';
      $scope.stats_url = 'http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=problem_stats&problemid='+p.pid+'&category=24';

      uhunt_db.set('generate-number', p.num);

      var ss = [];
      uhunt_user.each_pid(p.pid, function (sid, sub) {
        sub.name = uhunt_user.name();
        sub.uname = uhunt_user.uname();
        ss.push(sub);
      });
      ss.sort(sbt_cmp);

      $scope.your_last_submissions = ss;
      uhunt_db.set('show_search_result', $scope.show_search_result = true);
      $scope.search_title = p.tit;
      $scope.search_error = '';

      if ($scope.show_last == 'last') {
        uhunt_rpc.psubs_limit(p.pid, 0, uhunt_util.now() + 60 * 60 * 24 * 30, $scope.max_last_subs, function (arr) {
          arr.sort(sbt_cmp);
          $scope.last_submissions = arr;
        });
      } else {
        $scope.last_submissions = $scope.your_last_submissions;
      }

      if ($scope.show_top == 'top') {
        uhunt_rpc.prank(p.pid, 1, $scope.max_rank, update_ranklist);
      } else {
        var half = Math.floor(($scope.max_rank - 1) / 2);
        uhunt_rpc.pranknearby(p.pid, uhunt_user.uid, half, half + 1, update_ranklist);
      }

    } else {
      if ($scope.search_number != '') {
        $scope.search_error = 'No result for: ' + $scope.search_number + '.';
      }
      uhunt_db.set('show_search_result', $scope.show_search_result = false);
    }
  }
  console.timeEnd('ProblemSearchCtrl');
})

.controller('StatisticsCtrl', function ($scope, $filter, uhunt_rpc, uhunt_db, uhunt_util, uhunt_poll, uhunt_user, uhunt_problems, uhunt_algorithmist, uhunt_udebug) {
  console.time('StatisticsCtrl');
  $scope.uid = uhunt_user.uid;
  $scope.name = uhunt_user.name();
  $scope.username = uhunt_user.uname();
  $scope.show_solved = uhunt_db.get('show_solved'); 
  if ($scope.show_solved != 'less' && $scope.show_solved != 'more')
    $scope.show_solved = 'less';
  $scope.uhunt_problems = uhunt_problems;
  $scope.$watch('uhunt_problems.version', refresh);
  var solved_problems = [], tried = [];

  $scope.algorithmist_width = function (num) {
    return (uhunt_algorithmist.exists(num) ? 15 : 0) + (uhunt_udebug.exists(num) ? 20 : 0);
  };

  $scope.show_last_submissions = function (n) {
    n = n ? n : uhunt_db.get('show_last_submissions');
    uhunt_db.set('show_last_submissions', n);
    var s = [];
    var no_p = {}, has_p = uhunt_problems.ready();
    uhunt_user.each_last_subs(n = n ? n : 5, function(i,sid,pid,sub){
      sub.p = has_p ? uhunt_problems.pid(pid) : no_p;
      s.push(sub);
    });
    $scope.last_submissions = s;
  };

  $scope.update_solved_problems = function (show_solved) {
    if (show_solved) uhunt_db.set('show_solved', $scope.show_solved = show_solved);
    var s = '', f = $filter('uhunt_problem');
    var n = Math.min(($scope.show_solved == 'less') ? 500 : 1e10, solved_problems.length);
    for (var i = 0; i < n; i++) {
      var p = solved_problems[i];
      s += '<a style="text-decoration:none;" class="' + f(p.pid, 'classes') + 
           '" href="' + f(p.pid, 'link') + '" target="_blank">' + p.num + '</a> ';
    }
    $scope.solved_problems = s;
    $scope.show_more = ($scope.show_solved == 'less' && solved_problems.length > 500);
  };

  function num_cmp(a,b){ return a.num - b.num; }
  uhunt_user.on('update', refresh);
  function refresh() {
    solved_problems = []; tried = [];
    uhunt_problems.each(function(pid, p) {
      p.st = uhunt_user.stats(pid);
      if (p.st.ac) solved_problems.push(p);
      else if (p.st.ntry > 0) tried.push(p);
    });
    tried.sort(num_cmp);
    solved_problems.sort(num_cmp);
    $scope.update_solved_problems();
    var s = '', f = $filter('uhunt_problem');
    for (var i = 0; i < tried.length; i++) {
      var p = tried[i];
      s += '<a style="text-decoration:none;" class="' + f(p.pid, 'classes') + 
           '" href="' + f(p.pid, 'link') + '" target="_blank">' + p.num + '</a> ';
    }
    $scope.tried_problems = s;
    $scope.tried = tried;
    $scope.n_solved = solved_problems.length;
    $scope.n_submissions = uhunt_user.nos();
    $scope.show_last_submissions();
  }
  console.timeEnd('StatisticsCtrl');
})

.controller('NextProblemsCtrl', function ($scope, $q, uhunt_rpc, uhunt_db, uhunt_util, uhunt_poll, uhunt_user, uhunt_problems) {
  console.time('NextProblemsCtrl');
  // 0:pid, 1:localid, 2:title, 3:dacu, 4:min_runtime, 5:min_memory, 6:ac, 7:nos, 8:panos, 9:run, 10:diff

  function valid_column(){
    var av_cols = ['pid','num','tit','dacu','mrun','mmem','ac','nos','panos','run','diff'];
    for (var i = 0; i < av_cols.length; i++)
      if (uhunt_db.get('sort_desc') == av_cols[i]) return true;
    return false;
  }

  if (!valid_column()) uhunt_db.set('sort_column', 'dacu');
  $scope.sort_desc = uhunt_db.get('sort_desc') || true;
  $scope.sort_column = uhunt_db.get('sort_column');
  $scope.view_which = uhunt_db.get('np_view_which') || 0; // 0:unsolved, 1:solved, 2:both
  $scope.volume = uhunt_db.get('selected_volume') || 0;

  // if (view_which == 0) $('#npv_unsolved').css('color', 'lightgreen');
  // else if (view_which == 1) $('#npv_solved').css('color', 'lightgreen');
  // else $('#npv_both').css('color', 'lightgreen');

  $scope.max_next_problems = uhunt_db.get('show_next_problems') || 25;
  $scope.set_max_next_problems = function (n) {
    uhunt_db.set('show_next_problems', n);
    $scope.max_next_problems = n;
  };

  function next_comparator(a, b) {
    if (a[$scope.sort_column] == undefined) return 1;
    if (b[$scope.sort_column] == undefined) return -1;
    var x = a[$scope.sort_column], y = b[$scope.sort_column];
    var c = (x < y) ? -1 : ((x > y)? 1 : 0);
    return $scope.sort_desc? -c : c;
  }

  $scope.set_which = function (idx) {
    uhunt_db.set('np_view_which', $scope.view_which = idx);
    $scope.show_table();
  }

  $scope.sort_next_by = function (sc) {
    if ($scope.sort_column == sc){
      $scope.sort_desc = !$scope.sort_desc;
      uhunt_db.set('sort_desc', $scope.sort_desc);
    } else {
      $scope.sort_column = sc;
      uhunt_db.set('sort_column', $scope.sort_column);
    }
    $scope.show_table();
  };

  function show(n) {
    n = Math.min(100, Math.max(25, uhunt_util.parseInt(n)));
    uhunt_db.set('show_next_problems', n);
    $scope.show_table();
  }

  var volumes = {}, volume_all = [], volume_ac = {}, volume_list = [], next_comparator;

  $scope.column_color = function (sc, color) {
    return $scope.sort_column == sc ? color : '';
  };

  $scope.show_table = function (v) {
    if (v === undefined) v = $scope.volume;
    uhunt_db.set('selected_volume', v);
    $scope.volume = v;
    $scope.volume_name = v==0?'ALL':('v'+v);
    $scope.colspan = ($scope.view_which == 0) ? 8 : 11;
    var vids = (v == 0)? volume_all : volumes[v], cands = [];
    for (var i = 0; i < vids.length; i++) switch ($scope.view_which) {
      case 0 : if (!uhunt_user.stats(vids[i].pid).ac) cands.push(vids[i]); break; // unsolved
      case 1 : if ( uhunt_user.stats(vids[i].pid).ac) cands.push(vids[i]); break; // solved
      default: cands.push(vids[i]); // both
    }
    cands.sort(next_comparator);
    for (var i = 0; i < cands.length; i++){
      var p = cands[i];
      p.color = (i%2)? ($scope.sort_desc? '#BBEEBB' : '#EEBBBB') : ($scope.sort_desc? '#CCFFCC' : '#FFCCCC');
      p.st = uhunt_user.stats(p.pid);
    }
    $scope.next_problems = cands;
  };

  $scope.uhunt_problems = uhunt_problems;
  $scope.$watch('uhunt_problems.version', refresh);
  uhunt_user.on('update', refresh);

  function refresh() {
    volumes = {}; volume_all = []; volume_ac = {}; volume_list = [];
    uhunt_problems.each(function (pid, p) {
      var vol = Math.floor(p.num/100);
      if (!volumes[vol]){ volumes[vol] = []; volume_ac[vol] = 0; volume_list.push(vol); }
      volumes[vol].push(p);
      volume_all.push(p);
      var s = uhunt_user.stats(pid);
      if (s.ac) {
        p.run = s.mrun;
        p.mrun = Math.min(p.mrun, s.mrun);
  //        p.mmem = Math.min(p.mmem, s.mmem);
        p.diff = p.run - p.mrun;
        p.rank = Math.max(1,s.rank);
        volume_ac[vol]++;
      }
    });

    var vol_bars = [], sumac = 0, sumnos = 0;
    volume_list.sort(function (a, b) { return a - b; });
    for (var i = 0; i < volume_list.length; i++){
      var v = volume_list[i];
      vol_bars.push({ index: v, name: 'v' + v, percentage: Math.floor(volume_ac[v] * 100 / volumes[v].length) });
      sumac += volume_ac[v];
      sumnos += volumes[v].length;
    }
    vol_bars.push({ index: 0, name: 'ALL', percentage: Math.floor(sumac * 100 / sumnos) });
    $scope.volumes = vol_bars;

    $scope.show_table();

    // var sel_vol = uhunt_db.get('selected_volume');
    // $('.vol_row_'+sel_vol).each(function(i,a){ if (a.getAttribute) show_table(a); });

    // $.render_runtime = function(){
    //   submissions.ac_pids.sort(function(a,b){ // sort by decreasing runtime difference
    //     var da = submissions.min_runtime[problems.pid_key[a][0]] - problems.pid_key[a][4];
    //     var db = submissions.min_runtime[problems.pid_key[b][0]] - problems.pid_key[b][4];
    //     return db - da;
    //   });

    //   var s = '';
    //   for (var i=0; i<submissions.ac_pids.length && i<25; i++){
    //     var pid = submissions.ac_pids[i],
    //       p = problems.pid_key[pid],
    //       b = submissions.min_runtime[pid];
    //     s += '<tr><td>' + (i+1) +
    //       '<td>' + $.pid_link(p[0],p[1]) +
    //       '<td><span style="float:right">' + $.discuss(p[1]) + '</span>' + $.problem_a(p,200) +
    //       '<td>' + tpl.format_ms(b) +
    //       '<td>' + tpl.format_ms(p[4]) +
    //       '<td>' + tpl.format_ms(b-p[4]);
    //   }
    //   $('#runtime_tbody').html(s);
    // }
    // $.render_runtime();
  }
  console.timeEnd('NextProblemsCtrl');
})

.controller('RanklistCtrl', function ($scope, $q, uhunt_rpc, uhunt_db, uhunt_user) {
  console.time('RanklistCtrl');
  function rank_cmp(a,b) { return a.rank - b.rank; }
  $scope.show = function (key, val) { uhunt_db.set(key, val); render(); }
  function render() {
    var nabove = uhunt_db.get('ranklist-nabove') || 10;
    var nbelow = uhunt_db.get('ranklist-nbelow') || 10;
    uhunt_rpc.ranklist(uhunt_user.uid, nabove, nbelow, function (arr) {
      arr.sort(rank_cmp);
      $scope.ranklist = arr;
      for (var i = 0; i < arr.length; i++)
        if (arr[i].userid == uhunt_user.uid)
          arr[i].font_weight = 'bold';
    });
  }
  uhunt_user.on('update', render);

  /*
  var ac = submissions.ac_pids.length;
  var canvas = $('#percentile_canvas').html(;
  var width = 200, height = 475;
  if (!canvas.getContext) return;
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0,0,width+10,height+10);

  var x1 = 20.5, y1 = 20.5, x2 = width-50.5, y2 = height-50.5;

  // Filled triangle
  ctx.beginPath();
  ctx.moveTo(x2,y2);
  var mx = Math.log(solved_percentile[1]);
  var sum = 0, mine = 0, mxh = Math.log(solved_percentile.length);
  for (var i=1; i<solved_percentile.length; i++){
    var w = solved_percentile[i];
    if (i >= 16) sum += w;
    if (i <= ac) mine = sum;
    if (w) w = Math.log(w) / mx * (x2-x1);
    h = Math.log(i) / mxh * (y2-y1);
    ctx.lineTo(x2-w, y2 - h);

  }
  ctx.fillStyle = '#ADF';
  ctx.fill();


  ctx.fillStyle = '#000';
  ctx.strokeStyle = "#000";

  ctx.beginPath(); ctx.moveTo(x2,y1); ctx.lineTo(x2,y2); ctx.stroke(); // Y axis
  ctx.beginPath(); ctx.moveTo(x1,y2); ctx.lineTo(x2,y2); ctx.stroke(); // X axis

  for (var i=1; i<=solved_percentile.length; i*=2){
    var h = Math.floor(Math.log(i) / mxh * (y2-y1));
    ctx.beginPath();
    ctx.moveTo(x2,y2-h);
    ctx.lineTo(x2+5,y2-h);
    ctx.fillText(i, x2+10, y2-h+3);
    ctx.stroke();
  }

  var mxw = Math.log(10000);
  for (var i=1; i<=10000; i*=2){
    var w = Math.floor(Math.log(i) / mxw * (x2-x1));
    ctx.beginPath();
    if (i==16 || i== 256 || i==4096){
      ctx.moveTo(x2-w,y2);
      ctx.lineTo(x2-w,y2+8);
      ctx.fillText(i, x2-w-Math.log(i)*1.5, y2+20);
    } else {
      ctx.moveTo(x2-w,y2);
      ctx.lineTo(x2-w,y2+4);
    }
    ctx.stroke();
  }

  var p = Math.floor(mine/sum * 1000000) / 10000,
    h = ac==0? 0 : Math.floor(Math.log(ac) / mxh * (y2-y1));
  ctx.beginPath();
  ctx.moveTo(x1,y2-h); ctx.lineTo(x2,y2-h);
  ctx.font = "12px sans-serif";
  ctx.fillText('You are here', x1, y2-h-3);
  ctx.fillText('Percentile: ' + p, x1, y2-h+15);
  ctx.fillText('Frequency', x1, y2+35);
  ctx.fillText('Solved', x2+5, y1-5);
  ctx.strokeStyle = "#000";
  ctx.stroke();
  */
  console.timeEnd('RanklistCtrl');
})

.controller('VContestCtrl', function ($scope, $filter, uhunt_rpc, uhunt_util, uhunt_db, uhunt_user, uhunt_problems) {
  console.time('VContestCtrl');
  var probs = null;
  var ubits = {};
  var plevel = null;

  $scope.vcshadow_view = uhunt_db.get('vcshadow-view') || 'unsolved';
  $scope.show_unsolved = uhunt_db.get('vcontest_picker_show_unsolved') || true;
  $scope.vcontest_link = false;

  $scope.generate_vcontest = function () {
    var c = get_conf();
    if (!c) return;
    if (c.problem_numbers.length == 0 || !c.problem_numbers[0])
      return alert("Please pick at least one problem.");
    $scope.is_generating = true;
    $scope.vcontest_link_href = '';
    $scope.vcontest_link = 'Generating virtual contest ...';
    console.log(JSON.stringify(c));
    uhunt_rpc.vcontest_gen(c, function (res) {
      console.log('ok = ' + res.ok);
      if (res.ok) {
        var url = 'http://uhunt.felix-halim.net/vcontest/'+ res.id;
        $scope.vcontest_link_href = url;
        $scope.vcontest_link = url;
      } else {
        alert('Failed to generate vcontest.');
      }
      $scope.is_generating = false;
    });

//     $('#vcontest_gen_ta').val('\
// <!DOCTYPE html>\n\
// <html>\n\
// <head>\n\
// <meta charset="UTF-8">\n\
// <title>UVa Virtual Contest</title>\n\
// <link rel="shortcut icon" href="/images/uva-rounded.png" />\n\
// <link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.17/themes/cupertino/jquery-ui.css" />\n\
// <link rel="stylesheet" href="http://uhunt.felix-halim.net/css/uhunt-vcontest-1.0.css" />\n\
// <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></'+'script>\n\
// <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.17/jquery-ui.min.js"></'+'script>\n\
// <script type="text/javascript" src="http://uhunt.felix-halim.net/js/uhunt-vcontest-1.1.js"></'+'script>\n\
// <script>\n\
// uhunt.vcontest.start({\n\
//   user_ids: ['+c.user_ids.join(', ')+'],\n\
//   problem_numbers: ['+c.problem_numbers.join(", ")+'],\n\
//   start_sbt: '+c.start_sbt+',\n\
//   end_sbt: '+c.end_sbt+',\n\
//   ranklist_container: "ranklist_container",\n\
//   livesubs_container: "livesubs_container",\n\
// });\n\
// </'+'script>\n\
// </head>\n\
// <body>\n\
// <div id="livesubs_container"></div>\n\
// <div id="ranklist_container"></div>\n\
// </body>\n\
// </html>');
  };
  function init() {
    $("#datepicker").datepicker({ dateFormat: 'yy-mm-dd', timeFormat: 'hh:mm' });
    $("#datepicker").datepicker("setDate", new Date());
    fix_highlight();
    plevel = null;
    render_problem_picker(2);
  }

  var d = new Date(new Date().getTime() + 1000 * 60 * 10);
  $scope.contest_date = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
  $scope.contest_time = d.getHours() + ':' + d.getMinutes();
  $scope.duration = '5h';
  if (!uhunt_db.exists('uhunt_vcontest_uids'))
    uhunt_db.set('uhunt_vcontest_uids', "14942, 18017, 22972, 30959, 31991, 52185, 60556, 67264, 69534, 81816");
  $scope.user_ids = uhunt_db.get('uhunt_vcontest_uids');
  $scope.problem_numbers = '';

  function update_start_sbt(silent){
    var d = $scope.contest_date.split('/');
    var t = $scope.contest_time.split(':');
    d = new Date(d[0], d[1] - 1, d[2], t[0], t[1]);
    return Math.floor(d.getTime() / 1000);
  }

  function tointarray(v){
    v = v.split(',');
    for (var i=0; i<v.length; i++) v[i] = uhunt_util.parseInt(v[i]);
    return v;
  }

  function get_conf(silent){
    var start_sbt = update_start_sbt(silent);
    if (!silent && !start_sbt) return false;
    var d = $scope.duration;
    var dur = parseInt(d, 10);
    if (d.indexOf('w') != -1) dur *= 7 * 24 * 60 * 60;
    else if (d.indexOf('d') != -1) dur *= 24 * 60 * 60;
    else dur *= 60 * 60;
    if (dur > 30 * 24 * 60 * 60) return alert('Setting contest duration more than 1 month is not supported');
    uhunt_db.set('uhunt_vcontest_uids', $scope.user_ids);
    return {
      user_ids: tointarray($scope.user_ids),
      problem_numbers: tointarray($scope.problem_numbers),
      start_sbt: start_sbt,
      end_sbt: start_sbt? (start_sbt + (isNaN(dur)?0:dur)) : 0,
      contest_id: $scope.contest_id,
    };
  }

  function select_pnums(pnums, cid) {
    $scope.problem_numbers = pnums.join(', ');
    $scope.n_selected = pnums.length;
    $scope.contest_id = cid;
  }

  $scope.toggle_problem = function ($event) {
    var el = $event.target;
    el.className = (el.className == 'hilite') ? '' : 'hilite';
    var num = el.innerHTML;
    var c = get_conf(true);
    for (var i=0; i<c.problem_numbers.length; i++){
      if (c.problem_numbers[i] == num){
        c.problem_numbers.splice(i, 1);
        select_pnums(c.problem_numbers, 0);
        return;
      }
    }
    c.problem_numbers.push(num);
    select_pnums(c.problem_numbers, 0);
  };
  
  function populate_ubits(uids, cb) {
    var puids = [];
    for (var i=0; i < uids.length; i++)
      if (!ubits.hasOwnProperty(uids[i]))
        puids.push(uids[i]);
    if (puids.length == 0) return cb();
    uhunt_rpc.solved_bits(puids, function (arr) {
      for (var i=0; i<arr.length; i++){
        if (arr[i].solved === false) alert('Invalid UID : ' + arr[i].uid);
        ubits[arr[i].uid] = arr[i].solved;
      }
      cb();
    });
  }

  function calc_solved_pid(uids) {
    var solved = {};
    for (var i = 0; i < uids.length; i++){
      var uid = uids[i], s = ubits[uid];
      for (var j=0; j<s.length; j++) for (var k=0; k<(1<<5); k++)
        if ((s[j] & (1<<k)) && uhunt_problems.pid((j<<5) + k))
          solved[(j<<5) + k] = true;
    }
    return function (uid) { return solved.hasOwnProperty(uid); };
  }

  function calc_levels(solved_pid) {
    if (!plevel) {
      plevel = [];
      uhunt_problems.each(function (pid, p) {
        var lev = Math.max(1, 10 - Math.floor(Math.min(10, Math.log(p.dacu))));
        if (!plevel[lev]) plevel[lev] = [];
        plevel[lev].push(p);
      });
    }
    var levels = [];
    for (var lev = 1; lev <= 10; lev++){
      var ps = plevel[lev];
      for (var i = 0; i < ps.length; i++){
        if (!uhunt_db.get('vcontest_picker_show_unsolved') || !solved_pid(ps[i].pid)){
          var lev = Math.max(1, 10 - Math.floor(Math.min(10, Math.log(ps[i].dacu))));
          if (!levels[lev]) levels[lev] = [];
          levels[lev].push(ps[i]);
        }
      }
    }
    return levels;
  }

  // Pick 7 random numbers (type 1 = easy, 2 = medium, 3 = uniform).
  $scope.picker_type = 2;

  function pick_n(n, levels) {
    var buf = [];
    for (var i=1; i<=10; i++) if (levels[i]){
      var ps = levels[i]; buf[i] = [];
      for (var j=0; j<ps.length; j++){
        var k = Math.floor(Math.random()*ps.length);
        var t = ps[j]; ps[j] = ps[k]; ps[k] = t;
      }
      for (var j=0; j<n && j<ps.length; j++) buf[i].push(ps[j].num);
      ps.sort(function(a,b){ return a.pid - b.pid});
    }
    var pnums = [];
    var per_level_pick = ($scope.picker_type==1)? n : ($scope.picker_type==2)? 2 : 1;
    while (pnums.length < n){
      var added = false;
      for (var i=1; i<=10; i++) if (buf[i])
        for (var j=0; buf[i].length > 0 && j<per_level_pick && pnums.length < n; j++){
          pnums.push(buf[i].splice(0,1)[0]);
          added = true;
        }
      if (!added) break;
    }
    $scope.problem_numbers = pnums.join(', ');
    $scope.n_selected = pnums.length;
    return pnums;
  }

  $scope.render_problem_picker = function (type) {
    if (type) $scope.picker_type = type;
    var c = get_conf(true);
    populate_ubits(c.user_ids, function () {
      var solved_pid = calc_solved_pid(c.user_ids);
      var levels = calc_levels(solved_pid);
      c.problem_numbers = pick_n(7, levels);
      
      // The actual rendering.
      var selected = {}, s = '';
      for (var i=0; i<c.problem_numbers.length; i++)
        selected[c.problem_numbers[i]] = true;
      for (var i=1; i<=10; i++) if (levels.hasOwnProperty(i)){
        var arr = levels[i];
        for (var j=0; j<arr.length; j++)
          arr[j] = '<span style="font-size:10px; cursor:pointer;" '+(selected[arr[j].num]?'class="hilite"':'') +'>' + arr[j].num + '</span>';
        s += '<tr><td align=center>Level '+ i + '<td>' + arr.join(' ');
      }
      $scope.n_selected = c.problem_numbers.length;
      $scope.picker_tbody = s;
    });
  }

  $scope.set_show_unsolved = function (show) {
    uhunt_db.set('vcontest_picker_show_unsolved', $scope.show_unsolved = show);
    $scope.render_problem_picker();
  }

  $scope.view_picker = '';
  $scope.view_problem_picker = function (c) {
    if (c == $scope.view_picker) {
      $scope.view_picker = '';
    } else if (c == 'past') {
      $scope.view_picker = c;
      $scope.render_past_contests();
    } else if (c == 'pick') {
      $scope.view_picker = c;
      $scope.render_problem_picker();
    }
  }

  var contests = {"1":{"id":1,"name":"University of Valladolid Test Local Contest","starttime":963583200,"endtime":963601200,"problems":[10000,10001,10002,10003,10004,10005,10006,10007]},"2":{"id":2,"name":"Taiwan High School Problem Solving Contest 2000","starttime":964918800,"endtime":964936800,"problems":[11000,11001,11002,657,11003]},"3":{"id":3,"name":"University of Valladolid September '2000 Contest","starttime":969289200,"endtime":969303600,"problems":[10008,10009,10010,10011,10012]},"4":{"id":4,"name":"Simple contest by Alex Gevak","starttime":967892400,"endtime":967903200,"problems":[10013,10014]},"5":{"id":5,"name":"ITESM Campus Monterrey 4th Internal ACM Programming Contest 2000","starttime":969717600,"endtime":969732000,"problems":[10015,10016,10017,10018,10019]},"6":{"id":6,"name":"Second Programming Contest of Alex Gevak","starttime":970916400,"endtime":970938000,"problems":[10020,10021,10022,10023,10024,10025,10026]},"7":{"id":7,"name":"University of Valladolid Qualification for SWERC '2000 Local Contest","starttime":972720000,"endtime":972734400,"problems":[10027,10028,10029,10030,10031,10032,10033]},"8":{"id":8,"name":"SWERC '2000 Warm-Up","starttime":973872000,"endtime":973886400,"problems":[10034,10035,10036,10037,10038]},"9":{"id":9,"name":"Parallel Southwestern European Regional Contest","starttime":974631600,"endtime":974649600,"problems":[10039,10040,10041,10042,10043,10044,10045,10046]},"10":{"id":10,"name":"University of Valladolid End Of Millenium Contest","starttime":977994000,"endtime":978008400,"problems":[10047,10048,10049,10050]},"11":{"id":11,"name":"University of Valladolid New Millenium Contest","starttime":978537600,"endtime":978552000,"problems":[10051,10052,10053,10054]},"12":{"id":12,"name":"Bangladesh 2001 Programming Contest","starttime":978681600,"endtime":978703200,"problems":[10055,10056,10057,10058,10059,10060,10061,10062,10063,10064]},"13":{"id":13,"name":"BUET/UVA Occidental (WF Warmup) Contest 1","starttime":979905600,"endtime":979923600,"problems":[10065,10066,10067,10068,10069]},"14":{"id":14,"name":"BUET/UVA Oriental (WF Warmup) Contest 1","starttime":981273600,"endtime":981291600,"problems":[10070,10071,10072,10073,10074]},"15":{"id":15,"name":"BUET/UVA Occidental (WF Warmup) Contest 2","starttime":981723600,"endtime":981741600,"problems":[10075,10076,10077,10078,10079]},"16":{"id":16,"name":"University of Waterloo Local and Internet Contest January 2001","starttime":980618400,"endtime":980629200,"problems":[10080,10081,10082,10083,10084]},"17":{"id":17,"name":"BUET/UVA World Finals Warm-up","starttime":983001600,"endtime":983023200,"problems":[10085,10086,10087,10088,10089,10090,10091,10092,10093,10094,10095]},"18":{"id":18,"name":"TCL Programming Contest","starttime":986630400,"endtime":986646600,"problems":[10096,10097,10098,10099,10100,10101]},"19":{"id":19,"name":"Sergant Pepper's Lonely Programmers Club. Junior Contest 2001","starttime":984659400,"endtime":984673800,"problems":[10102,10103,10104,10105,10106]},"20":{"id":20,"name":"University of Valladolid Local Contest","starttime":989654400,"endtime":989668800,"problems":[10111,10112,10113,10114,10115,10116]},"21":{"id":21,"name":"Universities of Waterloo and Alberta  Spring Contest June 2001","starttime":991501200,"endtime":991512000,"problems":[10123,10124,10125,10126,10127]},"22":{"id":22,"name":"May Day Contest - Hats off to the workers of the world","starttime":988718400,"endtime":988729200,"problems":[10107,10108,10109,10110]},"24":{"id":24,"name":"OIBH Online Programming Contest 1","starttime":990943200,"endtime":990961200,"problems":[10117,10118,10119,10120,10121,10122]},"25":{"id":25,"name":"The 'silver wedding' contest","starttime":993826800,"endtime":993841200,"problems":[10131,10132,10133,10134,10135]},"26":{"id":26,"name":"Technical University of Szczecin Programming Contest 2001","starttime":991996200,"endtime":992014200,"problems":[10128,113,533,756,10129,10130]},"27":{"id":27,"name":"Summer keep-fit 1","starttime":994921200,"endtime":994939200,"problems":[10136,10137,10138,10139,10140,10141,10142]},"28":{"id":28,"name":"Summer keep-fit 2","starttime":996156000,"endtime":996174000,"problems":[10143,10144,10145,10146,10147,10148]},"29":{"id":29,"name":"Summer keep-fit 3","starttime":997995600,"endtime":998017200,"problems":[10149,10150,10151,10152,10153,10154,10155,10156]},"30":{"id":30,"name":"Lazy Summer Bulgarian Programming Contest (Bis)","starttime":998733600,"endtime":998748000,"problems":[10157,10158,10159,10160]},"31":{"id":31,"name":"Randy Game - Programming Contest 2001A","starttime":997527600,"endtime":997542000,"problems":[10161,10162,10163,10164,10165,10166,10167]},"32":{"id":32,"name":"2001 Regionals Warmup Contest","starttime":999329400,"endtime":999358200,"problems":[10168,10169,10170,10171,10172,10173,10174,10175,10176,10177,10178,10179,10180,10181]},"33":{"id":33,"name":"Xylophone's Dessert","starttime":1000447200,"endtime":1000461600,"problems":[10182,10183,10184,10185,10186,10187]},"34":{"id":34,"name":"Universidade do Brasil (UFRJ) Internal Contest Warmup 2001","starttime":1001692800,"endtime":1001703600,"problems":[10188,10189,10190,10191,10192,10193]},"35":{"id":35,"name":"University of Valladolid Final Local Contest","starttime":1004169600,"endtime":1004184000,"problems":[10201,10202,10203,10204,10205,10206]},"36":{"id":36,"name":"Universidade do Brasil (UFRJ) Internal Contest 2001","starttime":1002376800,"endtime":1002394800,"problems":[10194,10195,10196,10197,10198,10199,10200]},"37":{"id":37,"name":"Mindbend 2002 Programming Contest","starttime":1013839200,"endtime":1013853600,"problems":[10229,10230,10231,10232,10233,10234,10235]},"38":{"id":38,"name":"Math &amp; Number Theory Lovers' Contest","starttime":1007193600,"endtime":1007226000,"problems":[10207,10208,10209,10210,10211,10212,10213,10214,10215,10216,10217,10218]},"39":{"id":39,"name":"THE ROCKFORD PROGRAMMING CONTEST 2001","starttime":1008140400,"endtime":1008158400,"problems":[10219,10220,10221,10222,10223]},"40":{"id":40,"name":"World Finals Warmup Oriental Contest","starttime":1015052400,"endtime":1015095600,"problems":[10236,10237,10238,10239,10240,10241,10242,10243,10244,10245]},"41":{"id":41,"name":"World Finals Warmup Occidental Contest","starttime":1015844400,"endtime":1015880400,"problems":[10246,10247,10248,10249,10250,10251,10252,10253,10254,10255,10256]},"42":{"id":42,"name":"University of Waterloo Local and Internet Contest January 2002","starttime":1012068000,"endtime":1012078800,"problems":[10224,10225,10226,10227,10228]},"43":{"id":43,"name":"The Joint Open Contest of Gizycko Private Higher Education Intsitute Karolex and Brest State University, 2002","starttime":1019124000,"endtime":1019142000,"problems":[10263,10264,10265,10266,10267,10268]},"44":{"id":44,"name":"UVA Local Contest - First Round","starttime":1018684800,"endtime":1018699200,"problems":[10257,10258,10259,10260,10261,10262]},"45":{"id":45,"name":"UVA Local Contest - Second Round","starttime":1019894400,"endtime":1019910600,"problems":[10277,10278,10279,10280,10281,10282]},"46":{"id":46,"name":"OIBH Reminiscence Programming Contest","starttime":1019282400,"endtime":1019318400,"problems":[10269,10270,10271,10272,10273,10274,10275,10276]},"47":{"id":47,"name":"The Openner-Math Lovers' Contest","starttime":1022317200,"endtime":1022349600,"problems":[10283,10284,10285,10286,10287,10288,10289,10290,10291,10292,10293,10294]},"48":{"id":48,"name":"University of Waterloo Local and Internet Contest, June 2002","starttime":1022950800,"endtime":1023048000,"problems":[10295,10296,10297,10298,10299]},"49":{"id":49,"name":"The Joint Effort Contest (We and Rodrigo Malta)","starttime":1023534000,"endtime":1023566400,"problems":[10300,10301,10302,10303,10304,10305,10306,10307,10308,10309,10310,10311]},"50":{"id":50,"name":"The Conclusive Contest- The decider.","starttime":1025341200,"endtime":1025373600,"problems":[10312,10313,10314,10315,10316,10317,10318,10319,10320,229,10321,10322,10323,10324]},"51":{"id":51,"name":"The Real Programmers' Contest-1","starttime":1026374400,"endtime":1026399600,"problems":[10325,10326,10327,10328,10329,10330,10331,10332,10333,10334,10335]},"52":{"id":52,"name":"ACM Valladolid Practice Center Monthly Contest - July 2002","starttime":1027771200,"endtime":1027794600,"problems":[10336,10337,10338,10339,10340,10341,10342,10343,10344]},"53":{"id":53,"name":"ACM Valladolid Practice Center Monthly Contest - August 2002","starttime":1030190400,"endtime":1030203000,"problems":[10345,10346,10347,10348,10349,10350,10351,10352]},"54":{"id":54,"name":"ACM Valladolid Practice Center Monthly Contest - September 2002","starttime":1031907600,"endtime":1031929200,"problems":[10353,10354,10355,10356,10357,10358,10359,10360,10361]},"55":{"id":55,"name":"University of Waterloo Local and Internet Contest, Fall 2002","starttime":1032627600,"endtime":1032638400,"problems":[10362,10363,10364,10365,10366]},"56":{"id":56,"name":"Waterloo Second Fall and Internet Contest, 2002","starttime":1033232400,"endtime":1033243200,"problems":[10367,10368,10369,10370,10371]},"57":{"id":57,"name":"UVA Local Contest - Third'2002","starttime":1033804800,"endtime":1033819200,"problems":[10372,10373,10374,10375,10376,10377]},"58":{"id":58,"name":"The 2002 ACM Regionals Warmup Contest","starttime":1035450000,"endtime":1035475200,"problems":[10378,10379,10380,10381,10382,10383,10384,10385,10386]},"59":{"id":59,"name":"UVA Local Contest - Fourth'2002","starttime":1035014400,"endtime":1035028800,"problems":[10387,10388,10389,10390,10391,10392]},"60":{"id":60,"name":"Regionals Warmup Contest 2002, Venue: Southeast University, Dhaka, Bangladesh","starttime":1036211400,"endtime":1036229400,"problems":[10393,10394,10395,10396,10397,10398,10399,10400,10401,10402]},"61":{"id":61,"name":"November 2002 Monthly Contest","starttime":1036832400,"endtime":1036852200,"problems":[10403,10404,10405,10406,10407,10408,10409,10410]},"62":{"id":62,"name":"OIBH Online Programming Contest 2","starttime":1038031200,"endtime":1038067200,"problems":[10411,10412,10413,10414,10415,10416,10417,10418]},"63":{"id":63,"name":"Brightness of Brain Contest","starttime":1042880400,"endtime":1042909200,"problems":[10429,10430,10431,10432,10433,10434,10435,10436,10437,10438]},"64":{"id":64,"name":"January 2003 Monthly Contest. Warm-up for Beverly Hills :-)","starttime":1042268400,"endtime":1042290000,"problems":[10419,10420,10421,10422,10423,10424,10425,10426,10427,10428]},"65":{"id":65,"name":"University of Waterloo Local and Internet Contest, January 2003","starttime":1043517600,"endtime":1043528400,"problems":[10439,10440,10441,10442,10443]},"66":{"id":66,"name":"February 2003 Monthly Contest","starttime":1044691200,"endtime":1044709200,"problems":[10444,10445,10446,10447,10448,10449,10450,10451,10452]},"67":{"id":67,"name":"The Real Programmers' Contest -2 -A BUET Sprinter Contest","starttime":1045900800,"endtime":1045918800,"problems":[10453,10454,10455,10456,10457,10458,10459,10460,10461,10462]},"68":{"id":68,"name":"World Finals 2003 Warmup","starttime":1047373200,"endtime":1047398400,"problems":[10473,10474,10475,10476,10477,10478,10479,10480,10481,10482,10483]},"69":{"id":69,"name":"Return of the Aztecs","starttime":1046422800,"endtime":1046440800,"problems":[10463,10464,10465,10466,10467,10468,10469,10470,10471,10472]},"70":{"id":70,"name":"UVa Local Qualification &amp; April 2003 Monthly Contest","starttime":1051342200,"endtime":1051360200,"problems":[10484,10485,10486,10487,10488,10489,10490,10491]},"71":{"id":71,"name":"May 2003 Monthly Contest","starttime":1053774000,"endtime":1053794400,"problems":[10492,10493,10494,10495,10496,10497,10498,10499]},"72":{"id":72,"name":"June 2003 Monthly Contest","starttime":1055494800,"endtime":1055516400,"problems":[10509,10510,10511,10512,10513,10514,10515,10516,10517,10518]},"73":{"id":73,"name":"Waterloo ACM Programming Contest","starttime":1057424400,"endtime":1057435200,"problems":[10526,10527,10528,10529,10530]},"74":{"id":74,"name":"I Local Contest in Murcia 2003","starttime":1054971000,"endtime":1054985400,"problems":[10500,10501,10502,10503,10504,10505,10506,10507,10508]},"75":{"id":75,"name":"The Diamond Wedding Contest: Elite Panel's 1st Contest","starttime":1059210000,"endtime":1059235200,"problems":[10531,10532,10533,10534,10535,10536,10537,10538]},"76":{"id":76,"name":"THE SAMS' CONTEST","starttime":1056704400,"endtime":1056726000,"problems":[10519,10520,10521,10522,10523,10524,10525]},"77":{"id":77,"name":"UVa OJ August Monthly Contest","starttime":1061629200,"endtime":1061652600,"problems":[10539,10540,10541,10542,10543,10544,10545,10546,10547,10548]},"78":{"id":78,"name":"ACM ICPC Regional Contests - Warmup - First Contest","starttime":1065348000,"endtime":1065366000,"problems":[10559,10560,10561,10562,10563,10564,10565,10566]},"79":{"id":79,"name":"First Fall Waterloo Contest","starttime":1064077200,"endtime":1064088000,"problems":[10549,10550,10551,10552,10553]},"80":{"id":80,"name":"Second Fall Waterloo Contest","starttime":1064682000,"endtime":1064692800,"problems":[10554,10555,10556,10557,10558]},"81":{"id":81,"name":"ACM ICPC Regional Contests - Warmup - Second Contest","starttime":1065882600,"endtime":1065907800,"problems":[10567,10568,10569,10570,10571,10572,10573,10574]},"82":{"id":82,"name":"ICPC Dhaka Regional Contest at BUET, Online (The Day after the actual one)","starttime":1068800400,"endtime":1068818400,"problems":[12050,12051,12052,12053,12054,12055,12056,12057,12058,12059]},"83":{"id":83,"name":"UVa Local Qualification Contest","starttime":1067067000,"endtime":1067081400,"problems":[10575,10576,10577,10578,10579,10580]},"84":{"id":84,"name":"December 2003 Monthly Contest","starttime":1070701200,"endtime":1070719200,"problems":[10581,10582,10583,10584,10585,10586,10587,10588]},"85":{"id":85,"name":"IIUC Online Programming Contest","starttime":1071910800,"endtime":1071932400,"problems":[10589,10590,10591,10592,10593,10594,10595,10596,10597,10598,10599]},"86":{"id":86,"name":"UVa first school online contest","starttime":1073725200,"endtime":1073746800,"problems":[10600,10601,10602,10603,10604,10605,10606,10607,10608]},"87":{"id":87,"name":"January 2004 Monthly Contest","starttime":1074934800,"endtime":1074961800,"problems":[10609,10610,10611,10612,10613,10614,10615,10616,10617]},"88":{"id":88,"name":"Winter Waterloo Contest","starttime":1075572000,"endtime":1075582800,"problems":[10618,10619,10620,10621,10622]},"89":{"id":89,"name":"ACM ICPC World Finals Warmup - 1","starttime":1077354000,"endtime":1077375600,"problems":[10623,10624,10625,10626,10627,10628,10629,10630,10631]},"90":{"id":90,"name":"ACM ICPC World Finals Warmup - 2","starttime":1079186400,"endtime":1079208000,"problems":[10632,10633,10634,10635,10636,10637,10638,10639,10640,10641]},"91":{"id":91,"name":"The FOUNDATION Programming Contest 2004","starttime":1083659400,"endtime":1083677400,"problems":[10642,10643,10644,10645,10646,10647,10648,10649,10650]},"92":{"id":92,"name":"UVa Local and May Monthly Contest","starttime":1085216400,"endtime":1085234400,"problems":[10651,10652,10653,10654,10655,10656,10657,10658]},"93":{"id":93,"name":"II LOCAL CONTEST IN MURCIA","starttime":1086445800,"endtime":1086460200,"problems":[10659,10660,10661,10662,10663,10664,10665,10666,10667]},"94":{"id":94,"name":"Waterloo ACM Programming Contest","starttime":1087059600,"endtime":1087074000,"problems":[10668,10669,10670,10671,10672]},"95":{"id":95,"name":"UVa June 2004 Monthly Contest","starttime":1088240400,"endtime":1088262000,"problems":[10673,10674,10675,10676,10677,10678,10679,10680]},"96":{"id":96,"name":"UVa July 2004 Monthly Contest","starttime":1090659600,"endtime":1090681200,"problems":[10688,10689,10690,10691,10692,10693,10694,10695]},"97":{"id":97,"name":"ICPC Regional Contest Warmup 1","starttime":1096722000,"endtime":1096740000,"problems":[10732,10733,10734,10735,10736,10737,10738,10739]},"98":{"id":98,"name":"ICPC Regional Contest Warmup 2","starttime":1097917200,"endtime":1097938800,"problems":[10740,10741,10742,10743,10744,10745,10746,10747,10748]},"99":{"id":99,"name":"Federal University of Rio Grande do Norte Classifying Contest - Round 1","starttime":1090083600,"endtime":1090098000,"problems":[10681,10682,10683,10684,10685,10686,10687]},"100":{"id":100,"name":"Federal University of Rio Grande do Norte Classifying Contest - Round 2","starttime":1091898000,"endtime":1091916000,"problems":[10696,10697,10698,10699,10700,10701,10702,10703,10704]},"101":{"id":101,"name":"August 2004 Monthly Contest","starttime":1093683600,"endtime":1093701600,"problems":[10705,10706,10707,10708,10709,10710,10711,10712]},"102":{"id":102,"name":"University of Alberta/Waterloo Fall 1 Contest","starttime":1095613200,"endtime":1095624000,"problems":[10713,10714,10715,10716,10717]},"103":{"id":103,"name":"University of Waterloo Fall 2 Contest","starttime":1096131600,"endtime":1096142400,"problems":[10727,10728,10729,10730,10731]},"104":{"id":104,"name":"ACM ICPC Dhaka Regional (Online Version) at Northsouth University, Bangladesh(Semi Live!)","starttime":1097218800,"endtime":1097236800,"problems":[12060,12061,12062,12063,12064,12065,12066,12067]},"105":{"id":105,"name":"Intl. Islamic Univ Chittagong","starttime":1095753600,"endtime":1095771600,"problems":[10718,10719,10720,10721,10722,10723,10724,10725,10726]},"106":{"id":106,"name":"Novosibirsk SU contest 1","starttime":1098608400,"endtime":1098630000,"problems":[10749,10750,10751,10752,10754,10755,10757,10758]},"107":{"id":107,"name":"UVa OJ - A bonus Contest","starttime":1099126800,"endtime":1099170000,"problems":[10759,10760,10761,10762,10763,10764,10765,10766,10753,10756]},"108":{"id":108,"name":"UVa Local Qualification Contest","starttime":1099729800,"endtime":1099747800,"problems":[10767,10768,10769,10770,10771,10772]},"109":{"id":109,"name":"The FOUNDATION Programming 2nd Contest 2004","starttime":1100939400,"endtime":1100957400,"problems":[10773,10774,10775,10776,10777,10778,10779,10780,10781,10782]},"110":{"id":110,"name":"A Warmup for Bangladesh NCPC :)","starttime":1101556800,"endtime":1101571200,"problems":[10783,10784,10785,10786,10787,10788]},"111":{"id":111,"name":"Bangladesh National Computer Programming Contest","starttime":1102143600,"endtime":1102163400,"problems":[10789,10790,10791,10792,10793,10794,10795,10796,10797,10798,10799]},"112":{"id":112,"name":"Abednego's Graph Lovers' Contest 2005","starttime":1105203600,"endtime":1105225200,"problems":[10800,10801,10802,10803,10804,10805,10806,10807,10808]},"113":{"id":113,"name":"Waterloo Winter Contest","starttime":1107626400,"endtime":1107637200,"problems":[10809,10810,10811,10812,10813]},"114":{"id":114,"name":"Programming Contest for Newbies 2005","starttime":1108209600,"endtime":1108225200,"problems":[10814,10815,10816,10817,10818,10819]},"115":{"id":115,"name":"ACM ICPC World Finals Warmup 1","starttime":1110031200,"endtime":1110049200,"problems":[10820,10821,10822,10823,10824,10825,10826,10827,10828,10829]},"116":{"id":116,"name":"ACM ICPC World Finals Warmup 2","starttime":1111222800,"endtime":1111240800,"problems":[10830,10831,10832,10833,10834,10835,10836,10837,10838,10839]},"117":{"id":117,"name":"Contest ACM-BUAP 2005","starttime":1115474400,"endtime":1115492400,"problems":[10840,10841,10842,10843,10844,10845,10846,10847,10848]},"118":{"id":118,"name":"III Local Contest in Murcia","starttime":1116660600,"endtime":1116675000,"problems":[10849,10850,10851,10852,10853,10854,10855]},"119":{"id":119,"name":"The Next Generation - Contest I","starttime":1117270800,"endtime":1117288800,"problems":[10856,10857,10858,10859,10860,10861,10862,10863,10864]},"120":{"id":120,"name":"University of Alberta/Waterloo Spring Contest","starttime":1118509200,"endtime":1118520000,"problems":[10865,10866,10867,10868,10869]},"121":{"id":121,"name":"June 2005 Monthly Contest","starttime":1119690000,"endtime":1119711600,"problems":[10870,10871,10872,10873,10874,10875,10876,10877]},"122":{"id":122,"name":"UVa Monthly Contest August 2005","starttime":1123318800,"endtime":1123336800,"problems":[10887,10888,10889,10890,10891,10892,10893,10894]},"123":{"id":123,"name":"Abednego's Mathy Contest 2005","starttime":1122742800,"endtime":1122760800,"problems":[10878,10879,10880,10881,10882,10883,10884,10885,10886]},"124":{"id":124,"name":"UVa August 2005 Bonus Contest","starttime":1125133200,"endtime":1125147600,"problems":[10895,10896,10897,10898,10899]},"125":{"id":125,"name":"Waterloo ACM Programming Contest 1 (Fall)","starttime":1126976400,"endtime":1126987200,"problems":[10900,10901,10902,10903,10904]},"126":{"id":126,"name":"ACM ICPC Regional Contest 2005 - Dhaka Site - Semilive","starttime":1127466000,"endtime":1127484000,"problems":[12068,12069,12070,12071,12072,12073,12074,12075]},"127":{"id":127,"name":"Waterloo ACM Programming Contest 2 (Fall)","starttime":1127581200,"endtime":1127592000,"problems":[10915,10916,10917,10918,10919]},"128":{"id":128,"name":"UFRN-2005 Contest 1","starttime":1128166200,"endtime":1128177000,"problems":[10920,10921,10922,10923,10924,10925,10926]},"129":{"id":129,"name":"UFRN-2005 Contest 2","starttime":1128771000,"endtime":1128781800,"problems":[10927,10928,10929,10930,10931,10932,10933]},"130":{"id":130,"name":"A Special Contest","starttime":1129366800,"endtime":1129384800,"problems":[10934,10935,10936,10937,10938,10939,10940,10941,10942]},"131":{"id":131,"name":"UVa Local Qualification Contest","starttime":1129905000,"endtime":1129919400,"problems":[10943,10944,10945,10946,10947,10948]},"132":{"id":132,"name":"IIUC Programming Contest","starttime":1127206800,"endtime":1127224800,"problems":[10905,10906,10907,10908,10909,10910,10911,10912,10913,10914]},"133":{"id":133,"name":"ACM-ICPC Regional Contest Warmup","starttime":1130587200,"endtime":1130608800,"problems":[10949,10950,10951,10952,10953,10954,10955,10956,10957,10958]},"134":{"id":134,"name":"Don Giovanni Contest","starttime":1130932800,"endtime":1130947200,"problems":[10420,10959,10960,10961,10962,10963]},"135":{"id":135,"name":"Amirkabir University of Technology Local Contest - Round 2","starttime":1131600600,"endtime":1131622200,"problems":[10964,10965,10966,10967,10968,10969,10970,10971,10972,10973,10974,10975]},"136":{"id":136,"name":"The 2005 ACM Northwestern European Programming Contest","starttime":1131883200,"endtime":1131901200,"problems":[12076,12077,12078,12079,12080,12081,12082,12083,12084]},"137":{"id":137,"name":"Second Programming Contest for Newbies","starttime":1135771200,"endtime":1135785600,"problems":[10976,10977,10978,10979,10980,10981]},"138":{"id":138,"name":"Abednego's Graph Lovers' Contest 2006","starttime":1137870000,"endtime":1137888000,"problems":[10982,10983,10984,10985,10986,10987,10988,10989]},"139":{"id":139,"name":"Warming up for Warmups","starttime":1139657400,"endtime":1139679000,"problems":[10990,10991,10992,10993,10994]},"140":{"id":140,"name":"Winter Waterloo Contest","starttime":1140890400,"endtime":1140901200,"problems":[10995,10996,10997,10998,10999]},"141":{"id":141,"name":"ACM ICPC World Finals Warmup 1","starttime":1141462800,"endtime":1141480800,"problems":[11004,11005,11006,11007,11008,11009,11010,11011]},"142":{"id":142,"name":"ACM ICPC World Finals Warmup 2","starttime":1142683200,"endtime":1142704800,"problems":[11012,11013,11014,11015,11016,11017,11018,11019,11020]},"143":{"id":143,"name":"ACM ICPC World Finals Warmup 3","starttime":1143900000,"endtime":1143914400,"problems":[11021,11022,11023,11024,11025,11026]},"144":{"id":144,"name":"The Next Generation - Contest II","starttime":1147518000,"endtime":1147530600,"problems":[11027,11028,11029,11030,11031,11032,11033]},"145":{"id":145,"name":"Waterloo Spring Contest 2006","starttime":1148749200,"endtime":1148760000,"problems":[11034,11035,11036,11037,11038]},"146":{"id":146,"name":"IV Local Contest in Murcia 2006","starttime":1149319800,"endtime":1149334200,"problems":[11039,11040,11041,11042,11043,11044,11045,11046,11047]},"147":{"id":147,"name":"ACM ICPC: University of Ulm Local Contest","starttime":1153641600,"endtime":1153659600,"problems":[11048,11049,11050,11051,11052,11053,11054,11055]},"148":{"id":148,"name":"ACM ICPC:: UFRN Qualification Contest (Federal University of Rio Grande do Norte, Brazil)","starttime":1154797200,"endtime":1154815200,"problems":[11056,11057,11058,11059,11060,11061,11062,11063]},"149":{"id":149,"name":"Another German Contest","starttime":1155367800,"endtime":1155385800,"problems":[11064,11065,11066,11067,11068,11069,11070,11071,11072,11073]},"150":{"id":150,"name":"A Bangladeshi Contest","starttime":1157187600,"endtime":1157205600,"problems":[11074,11075,11076,11077,11078,11079,11080,11081,11082,11083]},"151":{"id":151,"name":"5th IIUC Inter-University Programming Contest, 2006","starttime":1157788800,"endtime":1157806800,"problems":[11084,11085,11086,11087,11088,11089,11090,11091,11092,11093]},"152":{"id":152,"name":"Amirkabir UT's Annual Contest 2006 Qualification Round","starttime":1158847200,"endtime":1158861600,"problems":[11094,11095,11096,11097,11098,11099]},"153":{"id":153,"name":"ACM ICPC:: Dhaka Regional Contest","starttime":1159002000,"endtime":1159020000,"problems":[12085,12086,12087,12088,12089,12090,12091,12092,12093,12094]},"154":{"id":154,"name":"Waterloo Fall Contest 1","starttime":1159117200,"endtime":1159128000,"problems":[11100,11101,11102,11103,11104]},"155":{"id":155,"name":"Waterloo Fall Contest 2","starttime":1159635600,"endtime":1159646400,"problems":[11105,11106,11107,11108,11109]},"156":{"id":156,"name":"ACM ICPC:: Regional Contests 2006 - Warmup 1","starttime":1160820000,"endtime":1160841600,"problems":[11118,11119,11120,11121,11122,11123,11124,11125,11126,11127,11128]},"157":{"id":157,"name":"Amirkabir UT Annual Programming Contest Final Round (Sponsored by LG - Maadiran)","starttime":1161932400,"endtime":1161950400,"problems":[11140,11141,11142,11143,11144,11145,11146,11147]},"158":{"id":158,"name":"XX Colombian National Programming Contest","starttime":1160242200,"endtime":1160260200,"problems":[11110,11111,11112,11113,11114,11115,11116,11117]},"159":{"id":159,"name":"ACM-ICPC:: North Western European Regional Contest 2006","starttime":1163932200,"endtime":1163950200,"problems":[12095,12096,12097,12098,12099,12100,12101,12102,12103]},"160":{"id":160,"name":"Alberta Collegiate Programming Contest 2006 - Online Version","starttime":1161514800,"endtime":1161536400,"problems":[11129,11130,11131,11132,11133,11134,11135,11136,11137,11138,11139]},"161":{"id":161,"name":"A Hard Contest! Surprise!!","starttime":1166432400,"endtime":1166518800,"problems":[12104,12105,12106,12107,12108,12109,12110,12111,12112,12113]},"162":{"id":162,"name":"Contest of Newbies 2006","starttime":1167480000,"endtime":1167494400,"problems":[11148,11149,11150,11151,11152,11153]},"163":{"id":163,"name":"ACM ICPC World Finals Warmup 1","starttime":1171702800,"endtime":1171720800,"problems":[11165,11166,11167,11168,11169,11170,11171,11172,11173,11174]},"164":{"id":164,"name":"ACM ICPC World Finals Warmup 2","starttime":1172329200,"endtime":1172347200,"problems":[11175,11176,11177,11178,11179,11180,11181,11182,11183,11184,11185]},"165":{"id":165,"name":"ACM ICPC World Finals Warmup 3","starttime":1172912400,"endtime":1172930400,"problems":[11186,11187,11188,11189,11190,11191,11192,11193,11194]},"166":{"id":166,"name":"Next Generation Contest III","starttime":1169287200,"endtime":1169308800,"problems":[11154,11155,11156,11157,11158,11159,11160,11161,11162,11163,11164]},"167":{"id":167,"name":"Rujia Liu's present 1: A tiny contest of brute force","starttime":1175331600,"endtime":1175349600,"problems":[11195,11196,11197,11198,11199]},"168":{"id":168,"name":"A Big Contest of Brute Force","starttime":1180774800,"endtime":1180861200,"problems":[11208,11209,11210,11211,11212,11213,11214,11215,11216,11217,11218]},"169":{"id":169,"name":"V Olimpiadas Murcianas de Programación","starttime":1179559800,"endtime":1179574200,"problems":[11200,11201,11202,11203,11204,11205,11206,11207]},"170":{"id":170,"name":"A Bangladeshi Contest","starttime":1185638400,"endtime":1185652800,"problems":[11244,11245,11246,11247,11248,11249,11250,11251,11252]},"171":{"id":171,"name":"UW Spring 07","starttime":1184432400,"endtime":1184443200,"problems":[11239,11240,11241,11242,11243]},"172":{"id":172,"name":"ACM ICPC:: UFRN Qualification Contest (Federal University of Rio Grande do Norte, Brazil)","starttime":1181408400,"endtime":1181426400,"problems":[11219,11220,11221,11222,11223,11224,11225,11226,11227,11228,11229]},"173":{"id":173,"name":"Ulm Local Contest","starttime":1183798800,"endtime":1183816800,"problems":[11230,11231,11232,11233,11234,11235,11236,11237,11238]},"174":{"id":174,"name":"Tsinghua-HKUST 2007","starttime":1186207200,"endtime":1186225200,"problems":[11253,11254,11255,11256,11257,11258,11259]},"175":{"id":175,"name":"Sultan's Contest","starttime":1188637200,"endtime":1188655200,"problems":[11260,11261,11262,11263,11264,11265,11266,11267,11268,11269]},"176":{"id":176,"name":"Combinatorics 2007","starttime":1189317600,"endtime":1189360800,"problems":[11270,11271,11272,11273,11274,11275,11276,11277]},"177":{"id":177,"name":"Calgary U Collegiate Programming Contest 2006","starttime":1189846800,"endtime":1189864800,"problems":[11278,11279,11280,11281,11282,11283,11284]},"178":{"id":178,"name":"Waterloo Fall Contest 1","starttime":1190566800,"endtime":1190577600,"problems":[11285,11286,11287,11288,11289]},"179":{"id":179,"name":"Waterloo Fall Contest 2","starttime":1191085200,"endtime":1191096000,"problems":[11290,11291,11292,11293,11294]},"180":{"id":180,"name":"The Relaxation Contest","starttime":1191146400,"endtime":1191175200,"problems":[11295,11296,11297,11298,11299,11300,11301,11302,11303,11304,11305,11306]},"181":{"id":181,"name":"Calgary U Collegiate Programming Contest 2007","starttime":1191661200,"endtime":1191675600,"problems":[11307,11308,11309,11310,11311,11312,11313,11314]},"182":{"id":182,"name":"ICPC Warm-up 2007","starttime":1192878000,"endtime":1192899600,"problems":[11315,11316,11317,11318,11319,11320,11321,11322]},"183":{"id":183,"name":"2007 ACPC Alberta Collegiate Programming\r\nContest","starttime":1193475600,"endtime":1193493600,"problems":[11323,11324,11325,11326,11327,11328,11329,11330,11331,11332]},"184":{"id":184,"name":"ACM ICPC::Dhaka Regional","starttime":1197190800,"endtime":1197208800,"problems":[12114,12115,12116,12117,12118,12119,12120,12121,12122,12123]},"185":{"id":185,"name":"XXI Colombian Programming Contest","starttime":1194073200,"endtime":1194091200,"problems":[11333,11334,11335,11336,11337,11338,11339]},"186":{"id":186,"name":"Nordic Collegiate Programming\r\nContest NCPC 2007","starttime":1196470800,"endtime":1196488800,"problems":[11362,11363,11364,11365,11366,11367,11368,11369,11370]},"187":{"id":187,"name":"Huge Easy Contest","starttime":1194771600,"endtime":1194793200,"problems":[11340,11341,11342,11343,11344,11345,11346,11347,11348,11349,11350,11351,11352]},"188":{"id":188,"name":"ACM ICPC::NWERC Regional","starttime":1195381800,"endtime":1195399800,"problems":[12124,12125,12126,12127,12128,12129,12130,12131,12132,12133]},"189":{"id":189,"name":"Contest of Newbies 2007","starttime":1198929600,"endtime":1198944900,"problems":[11371,11372,11373,11374,11375,11376]},"190":{"id":190,"name":"Next Generation Contest - IV","starttime":1195894800,"endtime":1195912800,"problems":[11353,11354,11355,11356,11357,11358,11359,11360,11361]},"191":{"id":191,"name":"Welcome 2008","starttime":1199523600,"endtime":1199539800,"problems":[11377,11378,11379,11380,11381,11382,11383,11384]},"192":{"id":192,"name":"IIUC Online Contest","starttime":1200128400,"endtime":1200146400,"problems":[11385,11386,11387,11388,11389,11390,11391,11392,11393,11394]},"193":{"id":193,"name":"Hasty Contest","starttime":1200744000,"endtime":1200762000,"problems":[11395,11396,11397,11398,11399,11400,11401,11402,11403]},"194":{"id":194,"name":"World Finals Warmup I","starttime":1205571600,"endtime":1205591400,"problems":[11417,11418,11419,11420,11421,11422,11423,11424,11425,11426]},"195":{"id":195,"name":"World Finals Warmup II","starttime":1206183600,"endtime":1206270000,"problems":[11427,11428,11429,11430,11431,11432,11433,11434,11435,11436]},"196":{"id":196,"name":"World Finals Warmup III","starttime":1206799200,"endtime":1206885600,"problems":[11437,11438,11439,11440,11441,11442,11443,11444,11445,11446]},"198":{"id":198,"name":"Samhita Online Programming Contest 2008 - Public","starttime":1203679800,"endtime":1203694200,"problems":[11404,11405,11406,11407,11408,11409,11410]},"199":{"id":199,"name":"CarteBlanche '08 - Computer Society","starttime":1204115400,"endtime":1204126200,"problems":[11411,11412,11413,11414,11415,11416]},"200":{"id":200,"name":"VI Olimpiadas Murcianas de Programación 2008","starttime":1211009400,"endtime":1211025600,"problems":[11447,11448,11449,11450,11451,11452,11453,11454,11455]},"201":{"id":201,"name":"Waterloo Local Spring 2008","starttime":1214038800,"endtime":1214049600,"problems":[11456,11457,11458,11459,11460]},"202":{"id":202,"name":"Next Generation Contest - 5","starttime":1217761200,"endtime":1217779200,"problems":[11471,11472,11473,11474,11475,11476,11477,11478,11479,11480]},"203":{"id":203,"name":"A Malaysian Contest","starttime":1215871200,"endtime":1215889200,"problems":[11461,11462,11463,11464,11465,11466,11467,11468,11469,11470]},"204":{"id":204,"name":"Brazilian National Contest","starttime":1221937200,"endtime":1221955200,"problems":[11491,11492,11493,11494,11495,11496,11497,11498,11499,11500]},"205":{"id":205,"name":"ACM ICPC::Regional Warmup 1 (Easy version)","starttime":1221310800,"endtime":1221328800,"problems":[11481,11482,11483,11484,11485,11486,11487,11488,11489,11490]},"206":{"id":206,"name":"ACM ICPC::Dhaka Regional Contest (Live)","starttime":1226134800,"endtime":1226154600,"problems":[12134,12135,12136,12137,12138,12139,12140,12141,12142,12143]},"207":{"id":207,"name":"ACM ICPC::South America Regional Contest (Live)","starttime":1226772000,"endtime":1226790000,"problems":[12144,12145,12146,12147,12148,12149,12150,12151,12152,12153,12154]},"208":{"id":208,"name":"ACM ICPC::Kualalumpur Regional Contest (Semi Live)","starttime":1229763600,"endtime":1229788800,"problems":[12155,12156,12157,12158,12159,12160,12161,12162,12163,12164,12165]},"209":{"id":209,"name":"ULAB NCPC 2008","starttime":1224406800,"endtime":1224428400,"problems":[11529,11530,11531,11532,11533,11534,11535,11536,11537]},"210":{"id":210,"name":"U Calgary Local contest","starttime":1225537200,"endtime":1225551600,"problems":[11547,11548,11549,11550,11551,11552,11553,11554]},"211":{"id":211,"name":"XXII Colombian Programming Contest","starttime":1222848000,"endtime":1222866000,"problems":[11506,11507,11508,11509,11510,11511,11512,11513,11514]},"212":{"id":212,"name":"ACM ICPC::Regional Warmup 2","starttime":1223715600,"endtime":1223737200,"problems":[11520,11521,11522,11523,11524,11525,11526,11527,11528]},"213":{"id":213,"name":"Waterloo ACM Programming Contest Fall 1","starttime":1222534800,"endtime":1222545600,"problems":[11501,11502,11503,11504,11505]},"214":{"id":214,"name":"Waterloo ACM Programming Contest Fall 2","starttime":1223139600,"endtime":1223152200,"problems":[11515,11516,11517,11518,11519]},"215":{"id":215,"name":"BUET:: CSE Day Programming Contest 2008","starttime":1224932400,"endtime":1224950400,"problems":[11538,11539,11540,11541,11542,11543,11544,11545,11546]},"216":{"id":216,"name":"ACM ICPC::NWERC Regional Contest","starttime":1227438000,"endtime":1227456000,"problems":[12166,12167,12168,12169,12170,12171,12172,12173,12174,12175]},"217":{"id":217,"name":"One more high level contest","starttime":1229155200,"endtime":1229173200,"problems":[11555,11556,11557,11558,11559,11560,11561,11562,11563,11564]},"218":{"id":218,"name":"Another semi live regional","starttime":1227963600,"endtime":1227981600,"problems":[12176,12177,12178,12179,12180,12181,12182,12183,12184,12185]},"219":{"id":219,"name":"Contest of Newbies V","starttime":1230379200,"endtime":1230393600,"problems":[11565,11566,11567,11568,11569,11570,11571]},"220":{"id":220,"name":"World Finals Warmup I","starttime":1238335200,"endtime":1238421600,"problems":[11587,11588,11589,11590,11591,11592,11593,11594,11595]},"221":{"id":221,"name":"World Finals Warmup II","starttime":1238918400,"endtime":1239004800,"problems":[11596,11597,11598,11599,11600,11601,11602,11603,11604]},"222":{"id":222,"name":"Pre-warmup contest","starttime":1234602000,"endtime":1234612800,"problems":[11572,11573,11574,11575,11576]},"223":{"id":223,"name":"Another high quality contest","starttime":1235206800,"endtime":1235224800,"problems":[11577,11578,11579,11580,11581,11582,11583,11584,11585,11586]},"224":{"id":224,"name":"VII Programming Olympiads in Murcia","starttime":1243063800,"endtime":1243078200,"problems":[11614,11615,11616,11617,11618,11619,11620,11621,11622]},"225":{"id":225,"name":"The first contest of the new season","starttime":1241859600,"endtime":1241877600,"problems":[11605,11606,11607,11608,11609,11610,11611,11612,11613]},"226":{"id":226,"name":"Waterloo Local Spring 2009","starttime":1244916000,"endtime":1244930400,"problems":[11623,11624,11625,11626,11627]},"227":{"id":227,"name":"Brazilian National Contest 2009","starttime":1253390400,"endtime":1253408400,"problems":[11676,11677,11678,11679,11680,11681,11682,11683]},"228":{"id":228,"name":"CUPCAM 2009","starttime":1255766400,"endtime":1255784400,"problems":[11704,11705,11706,11707,11708,11709,11710,11711,11712]},"229":{"id":229,"name":"ACM ICPC South America Regional Contest","starttime":1256414400,"endtime":1256432400,"problems":[12186,12187,12188,12189,12190,12191,12192,12193,12194,12195,12196]},"230":{"id":230,"name":"One more ICPC Regional Contest","starttime":1257584400,"endtime":1257602400,"problems":[12197,12198,12199,12200,12201,12202,12203,12204,12205,12206]},"231":{"id":231,"name":"Yet another Bangladeshi Contest","starttime":1249117200,"endtime":1249135200,"problems":[11636,11637,11638,11639,11640,11641,11642,11643,11644,11645]},"232":{"id":232,"name":"XXIII Colombian Programming Contest","starttime":1252177200,"endtime":1252195200,"problems":[11656,11657,11658,11659,11660,11661,11662,11663,11664,11665]},"233":{"id":233,"name":"ULM Local Contest","starttime":1247907600,"endtime":1247925600,"problems":[11628,11629,11630,11631,11632,11633,11634,11635]},"234":{"id":234,"name":"Regional Warmup 1","starttime":1252846800,"endtime":1252864800,"problems":[11666,11667,11668,11669,11670,11671,11672,11673,11674,11675]},"235":{"id":235,"name":"Once Again! A Bangladeshi Contest","starttime":1250931600,"endtime":1250952300,"problems":[11646,11647,11648,11649,11650,11651,11652,11653,11654,11655]},"236":{"id":236,"name":"Dhaka regional Semi-live","starttime":1256382000,"endtime":1256400000,"problems":[12207,12208,12209,12210,12211,12212,12213,12214,12215,12216,12217]},"237":{"id":237,"name":"Waterloo ACM Programming Contest Fall 1","starttime":1254070800,"endtime":1254081600,"problems":[11684,11685,11686,11687,11688]},"238":{"id":238,"name":"Waterloo ACM Programming Contest Fall 2","starttime":1254675600,"endtime":1254686400,"problems":[11699,11700,11701,11702,11703]},"239":{"id":239,"name":"Nordic Collegiate Programming Contest NCPC 2009","starttime":1254560400,"endtime":1254578400,"problems":[11689,11690,11691,11692,11693,11694,11695,11696,11697,11698]},"240":{"id":240,"name":"Another Regional Contest","starttime":1258182000,"endtime":1258200000,"problems":[12218,12219,12220,12221,12222,12223,12224,12225,12226,12227]},"241":{"id":241,"name":"IIUPC 2009","starttime":1256115600,"endtime":1256133600,"problems":[11713,11714,11715,11716,11717,11718,11719,11720,11721,11722]},"242":{"id":242,"name":"Wuhan Regional Semilive","starttime":1257152400,"endtime":1257170400,"problems":[12228,12229,12230,12231,12232,12233,12234,12235,12236,12237]},"243":{"id":243,"name":"World Finals Warmup I","starttime":1263632400,"endtime":1263651300,"problems":[11752,11753,11754,11755,11756,11757,11758,11759,11760]},"244":{"id":244,"name":"World Finals Warmup II","starttime":1264255200,"endtime":1264273200,"problems":[11761,11762,11763,11764,11765,11766,11767,11768,11769,11770]},"245":{"id":245,"name":"Alkhawarizmi Programming Contest 2009","starttime":1260003600,"endtime":1260021600,"problems":[11723,11724,11725,11726,11727,11728,11729,11730,11731,11732]},"246":{"id":246,"name":"A Bangladeshi Contest","starttime":1261209600,"endtime":1261227600,"problems":[11733,11734,11735,11736,11737,11738,11739,11740,11741]},"247":{"id":247,"name":"National Programming Contest of Bangladesh at SUST","starttime":1271494800,"endtime":1271512800,"problems":[11771,11772,11773,11774,11775,11776,11777,11778,11779]},"248":{"id":248,"name":"A Canadian Contest","starttime":1263024000,"endtime":1263042000,"problems":[11742,11743,11744,11745,11746,11747,11748,11749,11750,11751]},"249":{"id":249,"name":"Smartmatic CONNECT IV","starttime":1272130200,"endtime":1272144600,"problems":[11780,11781,11782,11783,11784,11785]},"250":{"id":250,"name":"VIII Programming Olympiads in Murcia (http://dis.um.es/contest)","starttime":1273908600,"endtime":1273926600,"problems":[11786,11787,11788,11789,11790,11791,11792,11793]},"252":{"id":252,"name":"A Contest from Dinajpur, Bangladesh","starttime":1277539200,"endtime":1277560800,"problems":[11794,11795,11796,11797,11798,11799,11800,11801,11802,11803]},"253":{"id":253,"name":"A Contest from BUBT, Bangladesh","starttime":1277625600,"endtime":1277643600,"problems":[11804,11805,11806,11807,11808,11809,11810,11811,11812]},"254":{"id":254,"name":"Waterloo Local Summer 2010","starttime":1278784800,"endtime":1278795600,"problems":[11813,11814,11815,11816,11817]},"255":{"id":255,"name":"One more National Programming Contest 2010","starttime":1283590800,"endtime":1283617800,"problems":[11818,11819,11820,11821,11822,11823,11824,11825,11826,11827,11828,11829]},"256":{"id":256,"name":"Brazilian National Contest 2010","starttime":1284836400,"endtime":1284854400,"problems":[11830,11831,11832,11833,11834,11835,11836,11837,11838,11839,11840]},"257":{"id":257,"name":"ACM ICPC Latin America Regional Contest","starttime":1287860400,"endtime":1287878400,"problems":[12238,12239,12240,12241,12242,12243,12244,12245,12246,12247,12248]},"258":{"id":258,"name":"Regional Warmup Contest 2010","starttime":1286614800,"endtime":1286658000,"problems":[11859,11860,11861,11862,11863,11864,11865,11866,11867]},"259":{"id":259,"name":"Anupam Bhattacharjee Memorial Contest","starttime":1287928800,"endtime":1287946800,"problems":[11868,11869,11870,11871,11872,11873,11874,11875,11876]},"260":{"id":260,"name":"Dhaka Regional Semilive","starttime":1289052000,"endtime":1289070000,"problems":[12279,12280,12281,12282,12283,12284,12285,12286,12287,12288]},"261":{"id":261,"name":"Kualalumpur Regional Semilive","starttime":1292144400,"endtime":1292180400,"problems":[12249,12250,12251,12252,12253,12254,12255,12256,12257,12258]},"262":{"id":262,"name":"XXIV Colombian Programming Contest","starttime":1284886800,"endtime":1284904800,"problems":[11841,11842,11843,11844,11845,11846,11847,11848]},"263":{"id":263,"name":"Waterloo Local 2010, Fall 1","starttime":1286038800,"endtime":1286049600,"problems":[11849,11850,11851,11852,11853]},"264":{"id":264,"name":"Waterloo Local 2010, Fall 2","starttime":1286125200,"endtime":1286136000,"problems":[11854,11855,11856,11857,11858]},"265":{"id":265,"name":"2010 AUT ACM-ICPC Local Contest","starttime":1288429200,"endtime":1288447200,"problems":[11888,11889,11890,11891,11892,11893,11894,11895,11896,11897,11898]},"266":{"id":266,"name":"The Sixth Hunan Collegiate Programming Contest Semilive","starttime":1288515600,"endtime":1288533600,"problems":[11877,11878,11879,11880,11881,11882,11883,11884,11885,11886,11887]},"267":{"id":267,"name":"NWERC Regional Semilive","starttime":1290333600,"endtime":1290351600,"problems":[12259,12260,12261,12262,12263,12264,12265,12266,12267,12268]},"268":{"id":268,"name":"SWERC Contest","starttime":1290848400,"endtime":1290866400,"problems":[12269,12270,12271,12272,12273,12274,12275,12276,12277,12278]},"269":{"id":269,"name":"World Finals Warmup I","starttime":1296907200,"endtime":1296925200,"problems":[11915,11916,11917,11918,11919,11920,11921,11922,11923,11924]},"270":{"id":270,"name":"World Finals Warmup II","starttime":1304769600,"endtime":1304787600,"problems":[11999,12000,12001,12002,12003,12004,12005,12006,12007,12008]},"271":{"id":271,"name":"A National Bangladeshi Contest","starttime":1294488000,"endtime":1294506000,"problems":[11899,11900,11901,11902,11903,11904,11905,11906,11907,11908]},"272":{"id":272,"name":"Sixth Contest of Newbies","starttime":1296302400,"endtime":1296316800,"problems":[11909,11910,11911,11912,11913,11914]},"273":{"id":273,"name":"Celebration for the 106th Anniversary of Fudan University (1905-2011) & Warmup for ACM/ICPC 2011 World Finals","starttime":1305450000,"endtime":1305536400,"problems":[12009,12010,12011,12012,12013,12014,12015,12016,12017,12018]},"274":{"id":274,"name":"Alberta Collegiate Programming Contest","starttime":1298710800,"endtime":1298728800,"problems":[11925,11926,11927,11928,11929,11930,11931,11932,11933,11934,11935]},"275":{"id":275,"name":"IX Programming Olympiads in Murcia","starttime":1305964800,"endtime":1305979200,"problems":[12019,12020,12021,12022,12023,12024,12025,12026,12027]},"276":{"id":276,"name":"A local contest from México","starttime":1301745600,"endtime":1301760000,"problems":[11936,11937,11938,11939,11940,11941]},"277":{"id":277,"name":"A regional contest from México","starttime":1301817600,"endtime":1301835600,"problems":[11942,11943,11944,11945,11946,11947,11948,11949,11950]},"278":{"id":278,"name":"Rujia Liu's Present 3: A datastructure contest celebrating the 100th anniversary of Tsinghua University","starttime":1303549200,"endtime":1303635600,"problems":[11987,11988,11989,11990,11991,11992,11993,11994,11995,11996,11997,11998]},"279":{"id":279,"name":"Huge Easy Contest II","starttime":1302336000,"endtime":1302422400,"problems":[11951,11952,11953,11954,11955,11956,11957,11958,11959,11960,11961,11962,11963,11964,11965,11966,11967,11968,11969,11970,11971,11972,11973,11974,11975,11976]},"280":{"id":280,"name":"A Contest dedicated to Renat Mullakhanov (rem)","starttime":1302944400,"endtime":1302962400,"problems":[11977,11978,11979,11980,11981,11982,11983,11984,11985,11986]},"281":{"id":281,"name":"Next generation Contest 6","starttime":1308992400,"endtime":1309010400,"problems":[12040,12041,12042,12043,12044,12045,12046,12047,12048,12049]},"282":{"id":282,"name":"Modified National Programming Contest of Bangladesh","starttime":1308474000,"endtime":1308492000,"problems":[12028,12029,12030,12031,12032,12033,12034,12035,12036,12037,12038,12039]},"283":{"id":283,"name":"The Seventh Hunan Collegiate Programming Contest Semilive","starttime":1316250000,"endtime":1316268000,"problems":[12289,12290,12291,12292,12293,12294,12295,12296,12297,12298,12299]},"284":{"id":284,"name":"Rujia Liu's Present 4: A contest dedicated to Geometry and CG lovers","starttime":1317461400,"endtime":1317547800,"problems":[12300,12301,12302,12303,12304,12305,12306,12307,12308,12309,12310,12311,12312,12313,12314]},"285":{"id":285,"name":"XXV Colombian Programming Contest","starttime":1318100400,"endtime":1318118400,"problems":[12315,12316,12317,12318,12319,12320,12321,12322,12323,12324]},"286":{"id":286,"name":"Asia Shanghai Regional Semilive hosted by Fudan University","starttime":1319378400,"endtime":1319464800,"problems":[12325,12326,12327,12328,12329,12330,12331,12332,12333,12334]},"287":{"id":287,"name":"ACM-ICPC Asia Phuket Regional Semilive","starttime":1320580800,"endtime":1320598800,"problems":[12346,12347,12348,12349,12350,12351,12352,12353,12354,12355]},"288":{"id":288,"name":"ACM ICPC Regional Warmup 2011","starttime":1319889600,"endtime":1319907600,"problems":[12335,12336,12337,12338,12339,12340,12341,12342,12343,12344,12345]},"291":{"id":291,"name":"Another Regional Contest to be decided","starttime":1321099200,"endtime":1321117200,"problems":[12356,12357,12358,12359,12360,12361,12362,12363,12364,12365,12366]},"292":{"id":292,"name":"SWERC 2011","starttime":1322380800,"endtime":1322398800,"problems":[12387,12388,12389,12390,12391,12392,12393,12394,12395,12396]},"293":{"id":293,"name":"7th Contest of Newbies","starttime":1325332800,"endtime":1325347200,"problems":[12397,12398,12399,12400,12401,12402]},"294":{"id":294,"name":"Shiraz University Local Contest 2011","starttime":1322298000,"endtime":1322316000,"problems":[12377,12378,12379,12380,12381,12382,12383,12384,12385,12386]},"295":{"id":295,"name":"Rujia Liu's Present 5: Developing simplified softwares","starttime":1326621600,"endtime":1326794400,"problems":[12412,12413,12414,12415,12416,12417,12418,12419,12420,12421,12422,12423]},"296":{"id":296,"name":"World Finals Warmup I","starttime":1330178400,"endtime":1330264800,"problems":[12433,12434,12435,12436,12437,12438,12439,12440,12441,12442,12443]},"297":{"id":297,"name":"Alberta Collegiate Programming Contest 2011","starttime":1333789200,"endtime":1333807200,"problems":[12444,12445,12446,12447,12448,12449,12450,12451,12452,12453]},"298":{"id":298,"name":"An easy Bangladeshi Contest","starttime":1325937600,"endtime":1325955600,"problems":[12403,12404,12405,12406,12407,12408,12409,12410,12411]},"299":{"id":299,"name":"BUET Inter-University Programming Contest - 2011","starttime":1329555600,"endtime":1329573600,"problems":[12424,12425,12426,12427,12428,12429,12430,12431,12432]},"300":{"id":300,"name":"X Programming Olympiads in Murcia (Spain)","starttime":1336203000,"endtime":1336217400,"problems":[12454,12455,12456,12457,12458,12459,12460]}
//,"301":{"id":301,"name":"Colombian Collegiate Programming League 2012","starttime":1338728400,"endtime":1338746400,"problems":[12461,12462,12463,12464,12465,12466,12467,12468,12469,12470]},"302":{"id":302,"name":"ACM ICPC:: Dhaka Regional Semilive","starttime":1354968000,"endtime":1354986000,"problems":[]},"304":{"id":304,"name":"First Bangladeshi Contest of 2012-2013 Season","starttime":1341651600,"endtime":1341669600,"problems":[12471,12472,12473,12474,12475,12476,12477,12478,12479,12480,12481]},"305":{"id":305,"name":"Latin America - Brazil Sub Regional","starttime":1347732000,"endtime":1347750000,"problems":[12482,12483,12484,12485,12486,12487,12488,12489,12490,12491,12492,12493]},"306":{"id":306,"name":"Latin America Regional","starttime":1352574000,"endtime":1352592000,"problems":[12524,12525,12526,12527,12528,12529,12530,12531,12532,12533]},"307":{"id":307,"name":"An European Regional contest to be decided","starttime":1353747600,"endtime":1353765600,"problems":[]},"308":{"id":308,"name":"The 8th Hunan Collegiate Programming Contest Semilive","starttime":1350205200,"endtime":1350223200,"problems":[12502,12503,12504,12505,12506,12507,12508,12509,12510,12511,12512,12513]},"309":{"id":309,"name":"An Asian Regional contest to be decided","starttime":1353240000,"endtime":1353258000,"problems":[12534,12535,12536,12537,12538,12539,12540,12541,12542,12543]},"310":{"id":310,"name":"Another Bangladeshi Contest","starttime":1349515800,"endtime":1349530200,"problems":[12494,12495,12496,12497,12498,12499,12500,12501]},"311":{"id":311,"name":"XXVI Colombian Programming Contest","starttime":1350761400,"endtime":1350779400,"problems":[12514,12515,12516,12517,12518,12519,12520,12521,12522,12523]},"312":{"id":312,"name":"Rujia Liu's Present 6: Happy 30th Birthday to Myself","starttime":1354438800,"endtime":1354525200,"problems":[]}
};
  var arr = null;
  var sort_cmp = {
    "id" : function (a,b){ return a.id - b.id },
    "title" : function (a,b){ return a.name < b.name? -1 : (a.name > b.name? 1 : 0); },
    "solved" : function (a,b){ return a.solved - b.solved; },
    "dacu" : function (a,b){ return a.dacu - b.dacu; },
    "nprobs" : function (a,b){ return a.problems.length - b.problems.length; },
    "duration" : function (a,b){ return a.duration - b.duration; },
  };
  
  $scope.select_past_contest = function ($event) {
    var el = $event.target;
    var contest_id = el.getAttribute('data-cid');
    select_pnums(contests[contest_id].problems, contest_id);
    $scope.render_past_contests();
  };

  $scope.render_past_contests = function (n) {
    if (!arr) {
      arr = [];
      for (var id in contests) if (contests.hasOwnProperty(id)){
        var c = contests[id];
        c.duration = Math.ceil((c.endtime - c.starttime)/60/60);
        c.dacu = c.solved = 0;
        for (var i=0; i<c.problems.length; i++){
          var p = uhunt_problems.num(c.problems[i]);
          var s = uhunt_user.stats(p.pid);
          if (s.ac) c.solved++;
          else c.dacu += p.dacu;
        }
        arr.push(c);
      }
      sort_it(uhunt_db.exists('vcshadow-sortby') ? uhunt_db.get('vcshadow-sortby') : 'id');
    }

    $scope.vcshadow_view = uhunt_db.get('vcshadow-view');
    if (!n){
      n = uhunt_db.get('vcshadow-n') || 25;
    } else {
      uhunt_db.set('vcshadow-n', n);
    }

    var s = '', sort_desc = !(uhunt_db.get('vcshadow-sortasc'));
    var sort_column = uhunt_db.get('vcshadow-sortby');
    if (!sort_column) sort_column = 'dacu';
    var conf = get_conf(true);
    for (var i=0,cnt=0; i<arr.length && cnt<n; i++){
      var c = arr[i], color = (cnt%2)? (sort_desc? '#BBEEBB' : '#EEBBBB') : (sort_desc? '#CCFFCC' : '#FFCCCC');
      if ($scope.vcshadow_view == 'unsolved' && c.solved == c.problems.length) continue;
      if ($scope.vcshadow_view == 'solved' && c.solved != c.problems.length) continue;
      if (c.problems.length == 0) continue;
      cnt++;
      s += '<tr height=17 style="'+((c.id == conf.contest_id)?'font-weight:bold':'')+'">' +
          '<td bgcolor="'+(sort_column=='id'?color:'')+'"align=center>' + c.id +
          '<td bgcolor="'+(sort_column=='title'?color:'')+
            '"><a class="ellipsis" style="width:350px; text-decoration:none; cursor:pointer" data-cid="'+ c.id+'"> &nbsp;' + c.name + '</a>' +
          // '<td><a href="javascript:uhunt.vcontest.gen('+c.id+','+userid+',\''+ JSON.stringify(c.problems) +'\')">generate</a>' + 
          '<td bgcolor="'+(sort_column=='solved'?color:'')+'" align=center>' + c.solved +
          '<td bgcolor="'+(sort_column=='nprobs'?color:'')+'" align=center>' + c.problems.length + 
          '<td bgcolor="'+(sort_column=='dacu'?color:'')+'" align=center>' + c.dacu + 
          '<td bgcolor="'+(sort_column=='duration'?color:'')+'" align=center>' + c.duration;
    }
    $scope.next_vcshadow = s;
  };

  $scope.update_which = function (idx) {
    uhunt_db.set('vcshadow-view', idx);
    $scope.render_past_contests();
  };

  function sort_it(by) {
    uhunt_db.set('vcshadow-sortby', by);
    var cmp = sort_cmp[by];
    if (uhunt_db.get('vcshadow-sortasc')){
      arr.sort(cmp);
    } else {
      arr.sort(function(a,b){ return -cmp(a,b); });
    }
  }

  $scope.sort_by = function (by) {
    if (uhunt_db.get('vcshadow-sortby') == by){
      var desc = (uhunt_db.get('vcshadow-sortasc')) ? 0 : 1;
      uhunt_db.set('vcshadow-sortasc', desc);
    }
    sort_it(by);
    $scope.render_past_contests();
  };

  console.timeEnd('VContestCtrl');
})

.controller('StatscmpCtrl', function ($scope, $filter, uhunt_rpc, uhunt_db, uhunt_user, uhunt_problems, cpbook1_numbers, cpbook2_numbers, cpbook3_numbers) {
  console.time('StatscmpCtrl');
  function intcmp(a,b){ return a - b; }

  function printSet(x){
    var sb = '', f = $filter("uhunt_problem");
    for (var i=0; i<x.length; i++){
      var p = uhunt_problems.num(x[i]);
      if (p){
        var st = uhunt_user.stats(p.pid);
        sb += '<a class="' + f(p.pid,'classes') +'" href="' + f(p.pid, 'link') + 
          '" style="text-decoration:none" target="_blank">' + f(p.pid, 'number') + '</a> ';
      }
    }
    return sb;
  }

  function intersect(x,y){
    if (unames_gathering) return false;
    var xi=0, yi=0, ret = [];
    while (xi<x.length && yi<y.length){
      if (intcmp(x[xi],y[yi])<0) xi++;
      else if (intcmp(x[xi],y[yi])>0) yi++;
      else { ret.push(y[yi++]); xi++; }
    }
    return ret;
  }

  function union(x,y){
    if (unames_gathering) return false;
    var xi=0, yi=0, ret = [];
    while (xi<x.length && yi<y.length){
      if (intcmp(x[xi],y[yi])<0) ret.push(x[xi++]);
      else if (intcmp(x[xi],y[yi])>0) ret.push(y[yi++]);
      else { ret.push(y[yi++]); xi++; }
    }
    while (xi<x.length) ret.push(x[xi++]);
    while (yi<y.length) ret.push(y[yi++]);
    return ret;
  }

  function subtract(x,y){
    if (unames_gathering) return false;
    var xi=0, yi=0, ret = [];
    while (xi<x.length && yi<y.length){
      if (intcmp(x[xi],y[yi])<0) ret.push(x[xi++]);
      else if (intcmp(x[xi],y[yi])>0) yi++;
      else { xi++; yi++; }
    }
    while (xi<x.length) ret.push(x[xi++]);
    return ret;
  }

  function next_token(){
    if (error_parsing) return 0;
    if (pos >= input_expr.length) return look = -1;
    var token = input_expr.charAt(pos++);
    while (token==' ' && pos < input_expr.length) token = input_expr.charAt(pos++);
    var c = token;
    while (c!='&' && c!='-' && c!='+' && c!='(' && c!=')' && pos < input_expr.length){
      c = input_expr.charAt(pos++);
      if (c!='&' && c!='-' && c!='+' && c!='(' && c!=')') token += c; else { pos--; break; }
    }
    return look = token.trim();
  }

  function match(x){
    if (error_parsing) return 0;
    if (x!=look) error_parsing = true;
    next_token();
  }

  function eval_var(v){
    if (unames_gathering){
      if (typeof cmp_users[v] == 'undefined') cmp_users[v] = 'unset';
      cur_users[v] = 'new';
    }
    match(v);
    return cmp_users[v];
  }

  function bracket(){
    if (error_parsing) return 0;
    if (look=='(') {
      match('(');
      var res = term();
      match(')');
      return res;
    }
    return eval_var(look);
  }

  function term(){
    if (error_parsing) return 0;
    var ret = bracket();
    while (!error_parsing && look!=-1){
      if (look=='&') { match('&'); ret = intersect(ret,bracket()); }
      else if (look=='+') { match('+'); ret = union(ret,bracket()); }
      else if (look=='-') { match('-'); ret = subtract(ret,bracket()); }
      else if (look==')') break;
      else error_parsing = true;
    }
    return ret;
  }

  function parse(){
    pos = 0;
    error_parsing = false;
    look = next_token();
    cur_users = {};
    result = term();
    if (look != -1) error_parsing = true;
    return !error_parsing;
  }

  var input_expr, pos, error_parsing, look, result, cmp_users = {}, cur_users = {}, unames_gathering,
  		S = [], CP1 = [], CP1S = [], CP2 = [], CP2S = [], CP3 = [], CP3S = [];

  function unique(arr) {
    for (var i = 0, j = 1; j < arr.length; j++) {
      if (arr[i] != arr[j]) {
        i++;
        if (i != j) arr[i] = arr[j];
      }
    }
    arr.length = i + 1;
  }

  // call this to initialize before use! (make sure the probs already set up)
  function initialize() {
    uhunt_problems.each(function(pid,p){ S.push(p.num); });
    S.sort(intcmp);
    cmp_users['S'] = S;
    for (var i = 0; i < cpbook1_numbers.length; i++) {
      var num = cpbook1_numbers[i];
      CP1.push(Math.abs(num));
      if (num < 0) CP1S.push(-num);
    }
    for (var i = 0; i < cpbook2_numbers.length; i++) {
      var num = cpbook2_numbers[i];
      CP2.push(Math.abs(num));
      if (num < 0) CP2S.push(-num);
    }
    for (var i = 0; i < cpbook3_numbers.length; i++) {
      var num = cpbook3_numbers[i];
      CP3.push(Math.abs(num));
      if (num < 0) CP3S.push(-num);
    }
    cmp_users['cp1'] = CP1;
    cmp_users['cp1s'] = CP1S;
    cmp_users['cp2'] = CP2;
    cmp_users['cp2s'] = CP2S;
    cmp_users['cp3'] = CP3;
    cmp_users['cp3s'] = CP3S;
    CP1.sort(intcmp);
    CP1S.sort(intcmp);
    CP2.sort(intcmp);
    CP2S.sort(intcmp);
    CP3.sort(intcmp);
    CP3S.sort(intcmp);
    unique(CP1);
    unique(CP1S);
    unique(CP2);
    unique(CP2S);
    unique(CP3);
    unique(CP3S);

    var username = uhunt_user.uname();
    $scope.cmp_expr = uhunt_db.get('cmp_expr') || ('felix_halim - ' + username);
  }
  initialize();

  function process(e, id) {
    if (!e) var e = window.event;
    var code;
    if (e.keyCode) code = e.keyCode;
    else if (e.which) code = e.which;
    if (code==13) execute_cmp_exp(id);
  }

  function clear() { cur_users = {}; cmp_users = {S:S, cp1:CP1, cp1s:CP1S, cp2:CP2, cp2s:CP2S, cp3:CP3, cp3s:CP3S}; };

  $scope.clear = function () { clear(); $scope.cmp_expr = ''; };
  $scope.execute_cmp_exp = function (expr) {
    function doit(){
      unames_gathering = false;
      parse();
      $scope.cmp_expr_res = "<i><b>Result of <span style='color:red'>"+color_op(expr)+"</span> : ("+
        result.length+" items) </b></i><p style='font-size:10px'>" + printSet(result) + '</p>';
    }

    if (expr.length == 0) {
      $scope.cmp_expr_res = '';
      return;
    }

    uhunt_db.set('cmp_expr', expr);
    var el = {}, but = {};
    el.disabled = 'disabled';
    but.disabled = 'disabled';
    // uhunt_db.set(id, expr);
    input_expr = expr; //.toLowerCase();
    unames_gathering = true;
    if (!parse()){
      el.disabled = '';
      but.disabled = '';
      return "Error occured during parsing, make sure you type a correct expression";
    } else {
      var fetch_unames = [];
      for (var uname in cur_users)
        if (cmp_users[uname]=='unset')
          fetch_unames.push(uname);

      if (fetch_unames.length > 0){
        uhunt_rpc.solved_bits(fetch_unames, function(res){
          var invalids = '';
          for (var i=0; i<res.length; i++){
            if (res[i].solved===false){
              invalids += res[i].username + "\n";
            } else {
              var s = res[i].solved, arr = [];
              for (var j=0; j<s.length; j++) for (var k=0; k<(1<<5); k++)
                if ((s[j] & (1<<k)) && uhunt_problems.pid((j<<5) + k)) arr.push(uhunt_problems.pid((j<<5) + k).num);
              arr.sort(intcmp);
              cmp_users[res[i].username] = arr;
            }
          }
          if (invalids.length > 0) return "Invalid username(s) :\n" + invalids;
          else doit();
          el.disabled = '';
          but.disabled = '';
        });
      } else {
        doit();
        el.disabled = '';
        but.disabled = '';
      }
    }
  };

  function color_op(s){
    var res = "";
    for (var i=0; i<s.length; i++){
      var c = s.charAt(i)
      if (c!='&' && c!='-' && c!='+' && c!='(' && c!=')') res += c;
      else res += "<font color=blue> "+c+" </font>";
    }
    return res;
  }
  console.timeEnd('StatscmpCtrl');
})

.directive('uhuntBar', function (uhunt_problems, uhunt_user, uhunt_util) {
  return {
    restrict: 'E',
    replace: true,
    scope: { width: '@', percent: '@', color: '@', height: '@' },
    template:
      '<table cellpadding="0" cellspacing="0">\
        <tr height="{{height}}">\
          <td style="width:{{ (Math.floor(percent / 10) / 10) * width}}px" bgcolor="{{color}}"></td>\
          <td style="width:{{ width - (Math.floor(percent / 10) / 10) * width}}px; border: 1px solid {{color}}"></td>\
        </tr>\
      </table>',
    link: function (scope, element, attrs) { scope.Math = Math; },
  };
})

.controller('CpBookCtrl', function ($scope, $filter, uhunt_db, uhunt_user, uhunt_problems, cpbook_1ed, cpbook_2ed, cpbook_3ed) {
  console.time('CpBookCtrl');
  var cpbook_chapters = [ cpbook_1ed, cpbook_2ed, cpbook_3ed ];
  var nth = ['1st', '2nd', '3rd'];
  var color = ['blue', 'brown', 'green'];
  var img = ['/images/cp.jpg', '/images/cp2-small.png', '/images/cp3.png'];
  var link = [
    'http://www.lulu.com/product/paperback/competitive-programming/12110025',
    'http://www.lulu.com/product/paperback/competitive-programming-2/16377304',
    'http://www.lulu.com/shop/steven-halim/competitive-programming-3/paperback/product-21031836.html'
  ];
  $scope.color1 = color[0];
  $scope.color2 = color[1];
  $scope.color3 = color[2];
  $scope.edition = Math.min(2, uhunt_db.exists('cpbook_edition') ? uhunt_db.get('cpbook_edition') : 2);
  $scope.chapter = uhunt_db.get('cpbook_chapter') || -1;
  $scope.show_chapter_type = uhunt_db.get('cpbook_show') || 'Starred'; // Starred or Everything.

  function apply_edition() {
    $scope.nth_ed = nth[$scope.edition];
    $scope.lulu_link = link[$scope.edition];
    $scope.cpbook_image = img[$scope.edition];
    $scope.other_ed = nth[1 - $scope.edition];
    $scope.other_color = color[1 - $scope.edition];
    $scope.chapters = cpbook_chapters[$scope.edition];
    $scope.build_sections();
    uhunt_db.set('cpbook_edition', $scope.edition);
  }

  $scope.set_chapter = function (chapter, type) {
    if (type) {
      uhunt_db.set('cpbook_show', type);
      $scope.show_chapter_type = type;
    }
    if ($scope.chapter === chapter && !type) {
      $scope.chapter = -1;
    } else {
      $scope.chapter = chapter;
    }
    $scope.build_sections();
    uhunt_db.set('cpbook_chapter', $scope.chapter);
  };

  $scope.is_selected_and = function (type, index) { return $scope.chapter == index && $scope.show_chapter_type == type; };
  $scope.not_is_selected_and = function (type, index) { return !$scope.is_selected_and(type, index); };

  $scope.build_sections = function () {
    // console.log('build_sections chapter = ' + $scope.chapter + '; problems ready = ' + uhunt_problems.ready());
    if ($scope.chapter < 0 || !uhunt_problems.ready()) return;
    var c = $scope.chapters[$scope.chapter];
    if (!c) return;
    var sections = [];
    for (var i = 0, LN = 0, RN = 0; i < c.arr.length; i++) {
      var sc = c.arr[i], nsolved = 0, ntotal = 0, nhead = 0, s = [];
      for (var j = 0; j < sc.arr.length; j++) {
        var ssc = sc.arr[j], ss = [], sub_solved = 0, sub_total = 0; nhead++;
        for (var k = 1; k < ssc.length; k++) {
          if ($scope.show_chapter_type == 'Starred' && ssc[k] > 0) continue;
          var p = uhunt_problems.num(Math.abs(ssc[k]));
          if (!p) continue;
          var st = uhunt_user.stats(p.pid);
          var status = '<b>--- ? ---</b>', ntry = st.ntry;
          if (st.ac){
            status = '<b><tt style="color:green">&#x2714; '+
              $filter('uhunt_format_ms')(st.mrun) + 's/' + (st.rank < 10000 ? st.rank : '&gt;10K');
            if (ntry > 0) status += '(' + ntry + ')';
            status += '</tt></b>';
            nsolved++;
            sub_solved++;
          } else if (ntry>0){
            status = '<b style="color:orange">Tried (' + ntry + ')</b>';
          }
          ss.push({
            status: '&nbsp;' + status, p: p, starred: ssc[k] < 0,
            level: 10 - Math.floor(Math.min(10, Math.log(p.dacu? p.dacu : 1)))
          });
          ntotal++;
          sub_total++;
        }
        s.push({
          title : '&nbsp;' + ssc[0] + ' <tt>(' + sub_solved + '/' + sub_total + ')</tt>',
          sections: ss,
        });
      }
      sections.push({
        float: LN <= RN ? 'left' : 'right',
        section_title: sc.title + ' <tt>(' + nsolved + '/' + ntotal + ' = ' + Math.floor(nsolved/ntotal*100)+'%)</tt>',
        sections: s,
      });
      ntotal += nhead;
      if (LN <= RN) LN += ntotal; else RN += ntotal;
    }
    $scope.sections = sections;
  }

  $scope.switch_edition = function(ed) {
    $scope.edition = ed;
    apply_edition();
  };

  $scope.uhunt_problems = uhunt_problems;
  apply_edition();
  $scope.$watch('uhunt_problems.version', $scope.build_sections);
  uhunt_user.on('update', $scope.build_sections);

  $scope.percentage = function (c, show) {
    var solved = 0, total = 0;
    for (var i=0; i<c.arr.length; i++){
      var sc = c.arr[i];
      for (var j=0; j<sc.arr.length; j++){
        var ssc = sc.arr[j];
        for (var k=1; k<ssc.length; k++){
          if (show == 'Starred' && ssc[k] > 0) continue;
          var p = uhunt_problems.num(Math.abs(ssc[k]));
          if (!p) continue;
          if (uhunt_user.stats(p.pid).ac) solved++;
          total++;
        }
      }
    }
    return Math.floor(solved * 100 / total);
  };
  console.timeEnd('CpBookCtrl');
})

angular.module('uHunt.filters', [])

.filter('uhunt_verdict', function(uhunt_verdict_map) {
  return function(ver, attr) {
    if (!uhunt_verdict_map[ver] || !uhunt_verdict_map[ver][attr])
      return console.error('verdict filter failed: ' + ver + ' ' + attr);
    return uhunt_verdict_map[ver][attr];
  }
})

.filter('uhunt_language', function(uhunt_language_map) {
  return function(lan, attr) {
    if (!uhunt_language_map[lan] || !uhunt_language_map[lan][attr])
      return console.error('language filter attr failed: ' + ver + ' ' + attr);
    return uhunt_language_map[lan][attr];
  };
})

.filter('uhunt_format_ms', function() {
  return function (ms) {
    if ((!ms && ms!==0) || ms > 100000) return '-';
    var sec = Math.floor(ms/1000); ms %= 1000;
    return sec + '.' + (ms < 10 ? '00' : (ms < 100 ? '0' : '')) + ms;
  };
})

.filter('uhunt_problem', function (uhunt_problems, uhunt_user, uhunt_util) {
  return function (pid, attr) {
    if (!uhunt_problems.ready()) return '';
    var p = uhunt_problems.pid(pid);
    if (attr == 'link') return p ? ('http://uva.onlinejudge.org/external/' + Math.floor(p.num/100) + '/' + p.num + '.html') : '#';
    if (attr == 'number') return p ? p.num : ' - ';
    if (attr == 'classes') {
      if (!p) return "";
      var st = uhunt_user.stats(p.pid);
      var ago = (uhunt_util.now() - st.last_sbt) / 60 / 60 / 24;
      var ret = 'prob ';
      if (p.status === 0) ret += 'prob_x';
      else {
        ret += (st.ac ? 'sub_ac' :
          st.ntry ? 'sub_wa' : 'sub_none') + ' ' + 
          ((ago <= 2) ? 'sub_2d' :
            (ago <= 7) ? 'sub_7d' :
            (ago <= 31) ? 'sub_1m' :
            (st.mrun == p.mrun)? 'sub_best' : '');
        if (p.status === 2) ret += ' prob_y';
      }
      return ret;
    }
    return p ? p.tit : '--- ? ---';
  };
})

.filter('uhunt_rank', function() {
  return function (rank) {
    return rank === -1 ? ' - ' : rank;
  };
})

.filter('uhunt_user_url', function() {
  return function (uid) {
    return '/id/' + uid;
  };
})

.filter('uhunt_duration', function () {
  return function (since) {
    var delta = new Date().getTime() - since;
    var dur = Math.max(0,Math.floor(delta / 1000 / 60));
    if (dur < 60) { return dur + 'm'; }
    dur = Math.floor(dur / 60);
    if (dur < 24) { return dur + 'h'; }
    if (dur < 24 * 30) { return Math.floor(dur / 24) + 'd'; }
    return Math.floor(dur / 24 / 30) + 'M';
  };
})

.filter('uhunt_format_time', function ($filter, uhunt_delta_time) {
  return function (t, back) {
    t -= uhunt_delta_time.get();
    var w = new Date().getTime()/1000 - t;
    if (back<=5 && w < 60) { return Math.ceil(w) + ' secs ago'; }
    if (back<=4 && w < 60*60) { return Math.floor(w/60) + ' mins ago'; }
    if (back<=3 && w < 24*60*60) { return Math.floor(w/60/60) + ' hours ago'; }
    if (back<=2 && w < 30*24*60*60) { return Math.floor(w/60/60/24) + ' days ago'; }
    if (back<=1 && w < 365*24*60*60) { return Math.floor(w/60/60/24/30) + ' months ago'; }
    return $filter('date')(t*1000, 'yyyy-MM-dd HH:mm');
  };
})

.filter('algorithmist', function (uhunt_algorithmist, uhunt_udebug) {
  return function (num, sep) {
    var ret = '';
    if (uhunt_algorithmist.exists(num)) {
      ret += '<a class="nou" target="_blank" href="http://www.algorithmist.com/index.php/UVa_' +
              num + '">&pi;</a>' + (sep ? (' ' + sep) : '');
    }
    if (uhunt_udebug.exists(num)) {
      ret += '<a class="nou" target="_blank" href="http://www.udebug.com/UVa/' +
              num + '"><img src="http://uhunt.felix-halim.net/images/udebug3.png"></a>' + (sep ? (' ' + sep) : '');
    }
    return ret;
  };
})




angular.module('uHunt.directives', [])

.directive('appVersion', function (version) {
  return function(scope, elm, attrs) {
    elm.text(version);
  };
})


.directive('scrollIf', function () {
  return function (scope, element, attrs) {
    setTimeout(function () {
      if (scope.$eval(attrs.scrollIf)) {
        var el = element[0].parentElement;
        el.scrollTop = el.scrollHeight;
      }
    });
  };
})

.factory('uhunt_rounded_rectangle', function (uhunt_util) {
  return function (ctx, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(radius,0);
    ctx.lineTo(width-radius,0);
    ctx.bezierCurveTo(width,0, width,0, width,radius);
    ctx.lineTo(width, height-radius);
    ctx.bezierCurveTo(width,height, width,height, width-radius,height);
    ctx.lineTo(radius,height);
    ctx.bezierCurveTo(0,height, 0,height, 0,height-radius);
    ctx.lineTo(0,radius);
    ctx.bezierCurveTo(0,0, 0,0, radius,0);
    ctx.fill();
  }
})

.factory('uhunt_progress_renderer', function (uhunt_rounded_rectangle, uhunt_util) {
  return function (canvas, title, first_sbt, inc_amt, uhunt_util) {
    if (!canvas.getContext) return false;
    var width = canvas.width, height = canvas.height;
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,width,height);
    ctx.fillStyle = "#EEEEEE";
    uhunt_rounded_rectangle(ctx,width,height,10);

    var x1 = 15.5, x2 = width-37, y1 = 30.5, y2 = height-18.5;
    ctx.textAlign = 'center';
    var len = 0;
    for (var i = 0; i < inc_amt.length; i++) len += inc_amt[i];
    if (len == 0){
      ctx.font = "bold 15px sans-serif";
      ctx.fillText("No Progress Yet", x1+30, y1+60);
      return false;
    }

    var start = first_sbt[0], end = uhunt_util.now();
    var ylen = y2 - y1, ygap = ylen / len;
    var xlen = x2 - x1, tlen = Math.max(1, end - start);

    // Year Grid
    ctx.font = "10px sans-serif";
    ctx.fillStyle = "black";
    ctx.beginPath();
    for (var Y=new Date().getFullYear(), i=0; i<100; i++,Y--){
      var time = Math.floor(new Date(Y, 0, 1, 1, 1, 1, 1).getTime()/1000);
      if (start <= time && time <= end){
        var x = x1 + ((time-start)/tlen) * xlen;
        x = Math.floor(x) + 0.5;
        ctx.moveTo(x,y1); ctx.lineTo(x,y2);
        ctx.moveTo(x,y1); ctx.lineTo(x,y2);
        var year = Y%100;
        if (year < 10) year = '0'+year;
        ctx.fillText(year, x-1, y2+11, 20);
      } else if (time < start) break;
    }
    ctx.strokeStyle = "#CCCCCC";
    ctx.stroke();

    // Number of AC grid
    ctx.beginPath();
    ctx.textAlign = 'left';
    ctx.textBaseLine = 'middle';
    var inc = Math.floor(len / 7 + 1);
    for (var Y=0; Y<len; Y+=inc){
      var yy = Math.floor(y2 - (Y/len) * ylen) + 0.5;
      ctx.moveTo(x1,yy); ctx.lineTo(x2,yy);
      if (Y) ctx.fillText(Y >= 1e5 ? (Math.floor(Y*1e-3)+'K') : Y, x2+3, yy+3);
    }
    ctx.moveTo(x1,y1); ctx.lineTo(x2,y1);
    ctx.strokeStyle = "#CCCCCC";
    ctx.stroke();

    ctx.beginPath();
    var prevX = -1, prevY = -1, counter = 0, time = first_sbt[0];
    for (var i=0; i<=len; i++){
      var nx = Math.floor(x1 + ((time-start)/tlen) * xlen) + 0.5;
      var ny = Math.floor(y2 - (ygap*counter)) + 0.5;
      if (prevX!=nx){
        if (prevX==-1) ctx.moveTo(nx,ny);
        else ctx.lineTo(nx,ny);
      }
      prevX = nx;
      prevY = ny;
      if (i == len) break;
      time = first_sbt[i];
      counter += inc_amt[i];
    }
    if (prevX != x2) ctx.lineTo(x2,prevY);
    ctx.strokeStyle = "#000";
    ctx.stroke();

    ctx.font = "bold 11px sans-serif";
    ctx.fillStyle = '#0000FF';
    ctx.fillText(len >= 1e5 ? (Math.floor(len*1e-3) + 'K') : len, x2+3, y1+3);

    ctx.textAlign = 'center';
    ctx.font = "bold 12px sans-serif";
    ctx.fillStyle = '#000';
    ctx.fillText(title, (width) / 2, y1-12);
  };
})

.directive('progressStatistics', function (uhunt_problems, uhunt_user, uhunt_util, uhunt_progress_renderer) {
  return function (scope, element, attrs) {
    scope.uhunt_problems = uhunt_problems;
    scope.$watch('uhunt_problems.version', refresh);
    uhunt_user.on('update', refresh);
    function refresh() {
      console.time('progressStatistics');
      var first_ac_sbt = [], inc_amt = [];
      uhunt_problems.each(function (pid) {
        var s = uhunt_user.stats(pid);
        if (s.ac) {
          first_ac_sbt.push(s.first_ac_sbt);
          inc_amt.push(1);
        }
      });
      first_ac_sbt.sort(function(a,b){ return a-b; });
      uhunt_progress_renderer(element[0], 'Progress over the Years', first_ac_sbt, inc_amt, uhunt_util);
      console.timeEnd('progressStatistics');
    }
  };
})

.directive('problemProgressStatistics', function (uhunt_problems, uhunt_rpc, uhunt_util, uhunt_progress_renderer) {
  return function (scope, element, attrs) {
    scope.uhunt_problems = uhunt_problems;
    scope.$watch('uhunt_problems.version', refresh);
    scope.$watch(attrs.problemProgressStatistics, refresh);
    function refresh() {
      console.time('problemProgressStatistics');
      var number = scope.$eval(attrs.problemProgressStatistics);
      var p = uhunt_problems.num(number);
      if (!p) return;
      var sbt = uhunt_util.now(), back = 50, jump = 3;
      uhunt_rpc.subs_count(p.pid, sbt, back, jump, function (inc_amt) {
        if (inc_amt.length != 51) console.error('length expected ' + back + ', observed ' + inc_amt.length);
        var first_sbt = [], onemo = 60 * 60 * 24 * 30;
        for (var i = 0; i <= back; i++) first_sbt.push(sbt - (back - i) * onemo * jump);
        uhunt_progress_renderer(element[0], 'Submissions over the Years', first_sbt, inc_amt, uhunt_util);
        console.timeEnd('problemProgressStatistics');
      });
    }
  };
})

.directive('problemSubmissionStatistics', function (uhunt_problems, uhunt_util, uhunt_statistics_renderer) {
  return function (scope, element, attrs) {
    scope.$watch(attrs.problemSubmissionStatistics, function () {
      var number = scope.$eval(attrs.problemSubmissionStatistics);
      var p = uhunt_problems.num(number);
      if (!p) return;
      var cnt = {OT:0};
      ['AC','PE','WA','TL','ML','CE','RE'].forEach(function (sname) {
        cnt[sname] = 0;
        switch (sname) {
          case 'TL' : cnt[sname] = p.tle; break;
          case 'ML' : cnt[sname] = p.mle; break;
          default : cnt[sname] = p[sname.toLowerCase()];
        }
      });
      ['SE','CJ','QU','RF','OL'].forEach(function (sname) {
        switch (sname) {
          case 'SE' : cnt['OT'] += p.sube; break;
          case 'CJ' : cnt['OT'] += p.cbj; break;
          case 'QU' : cnt['OT'] += p.inq; break;
          case 'OL' : cnt['OT'] += p.ole; break;
          default : cnt['OT'] += p[sname.toLowerCase()];
        }
      });
      uhunt_statistics_renderer(element[0], cnt);
    });
  };
})

.factory('uhunt_sname2code', function (uhunt_verdict_map) {
  var sname2code = {};
  for (var code in uhunt_verdict_map)
    sname2code[uhunt_verdict_map[code].short_name] = code;
  return sname2code;  
})

.factory('uhunt_statistics_renderer', function (uhunt_util, uhunt_rounded_rectangle, uhunt_sname2code, uhunt_verdict_map) {
  return function (canvas, cnt) {
    if (!canvas.getContext) return false;
    var width = canvas.width, height = canvas.height;
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,width,height);
    ctx.fillStyle = "#EEEEEE";
    uhunt_rounded_rectangle(ctx,width,height,10);

    ctx.textAlign = 'center';

    var padding = 10, gap = 3;
    var x1 = padding + 0.5, x2 = width - padding + 0.5;
    var y1 = padding + 0.5, y2 = height - padding - 8.5;
    ctx.beginPath();
    ctx.moveTo(x1,y2); ctx.lineTo(x2,y2);
    ctx.strokeStyle = 'black';
    ctx.stroke(); // baseline

    var order = ['AC','PE','WA','TL','ML','CE','RE','OT'];
    var ncnt = [], maxcnt = 0, sumcnt = 0, fcolor = [];
    for (var o=0; o<order.length; o++){
      var code = uhunt_sname2code[order[o]];
      var color = code? uhunt_verdict_map[code].color : '#000';
      fcolor.push(color);
      if (!cnt[order[o]]) cnt[order[o]] = 0;
      ncnt.push(cnt[order[o]]);
      maxcnt = Math.max(maxcnt, cnt[order[o]]);
      sumcnt += cnt[order[o]];
    }
    if (maxcnt == 0){
      ctx.font = 'bold 15px sans-serif';
      ctx.fillText('No Submission Yet', width/2, y1+50);
      return false;
    }

    // draw the bars
    var barsize = (x2-x1-padding-(gap*(order.length-1))) / order.length;
    for (var i=0; i<order.length; i++){
      var x = x1 + padding/2 + i*barsize + i*gap;
      var h = Math.ceil((ncnt[i] / maxcnt) * (y2-y1-30));
      ctx.fillStyle = fcolor[i];
      ctx.strokeStyle = fcolor[i];
      ctx.fillRect(x, y2-h-0.5, barsize, h);
      var LO = cnt[order[i]]>0? Math.log(cnt[order[i]]) : 0;
      var d = Math.ceil(LO / Math.log(10));
      var a = (barsize - d*5) / 2;
      ctx.font = '9px sans-serif';
      ctx.fillText(cnt[order[i]], x+(barsize/2), y2-h-6);
      ctx.fillText(order[i], x+(barsize/2), y2+10);
    }
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText('Submissions Statistics', width/2, y1+7);
  }
})

.directive('submissionStatistics', function (uhunt_problems, uhunt_user, uhunt_util,
    uhunt_progress_renderer, uhunt_statistics_renderer, uhunt_verdict_map, uhunt_sname2code) {
  return function (scope, element, attrs) {
    uhunt_user.on('update', function () {
      console.time('submissionStatistics');
      var cc = uhunt_user.substats_count(), cnt = {OT:0};
      ['AC','PE','WA','TL','ML','CE','RE'].forEach(function (sname) {
        var code = uhunt_sname2code[sname];
        if (code) cnt[sname] = cc[code];
      });
      ['SE','CJ','QU','RF','OL'].forEach(function (sname) {
        var code = uhunt_sname2code[sname];
        if (code && cc[code]) cnt['OT'] += cc[code];
      });
      uhunt_statistics_renderer(element[0], cnt);
      console.timeEnd('submissionStatistics');
    });
  };
})

// .directive('zippy', function(){
//   return {
//     restrict: 'C',
//     replace: true,
//     scope: { title:'@zippyTitle' },
//     template: '<a class="title">{{title}}</a>',
//     link: function(scope, element, attrs) {
//       var title = angular.element(element.children()[0]), opened = true;
//       title.bind('click', toggle);
//       function toggle() {
//         opened = !opened;
//         element.removeClass(opened ? 'closed' : 'opened');
//         element.addClass(opened ? 'opened' : 'closed');
//       }
//       toggle();
//     }
//   }
// });

/*
uhunt.register_visibility_change = function() {
  // http://davidwalsh.name/page-visibility
  var hidden, state, visibilityChange; 
  if (typeof document.hidden !== "undefined") {
    hidden = "hidden";
    visibilityChange = "visibilitychange";
    state = "visibilityState";
  } else if (typeof document.mozHidden !== "undefined") {
    hidden = "mozHidden";
    visibilityChange = "mozvisibilitychange";
    state = "mozVisibilityState";
  } else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
    state = "msVisibilityState";
  } else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
    state = "webkitVisibilityState";
  }

  // Add a listener that constantly changes the title
  document.addEventListener(visibilityChange, function() {
    uhunt.observer.notify('visibilitychange', !document[hidden]);
  }, false);
};


function (arr) {
        var updated = false;
        for (var i = 0; i < arr.length; i++) {
          var s = arr[i];
          uhunt.observer.notify('submission', s);
          if (s.uid == userid){
            uhunt.subs.update(s);
            updated = true;
          }
          uhunt_util.adjust_delta_time(s.sbt);
          uhunt.livesubs[0].update(s, arr.length < 20);
        }
        if (arr.length >= 20) {
          uhunt.livesubs[0].update_display();
        }
        if (updated){
          render_all();
        }
      }

      on_out_of_sync: function(){
        uhunt_rpc.subs_since(userid, uhunt.subs.lastId(), 
          function (ret) { parse_subs(ret.subs); });
      },


var vcontest = (function(){
  var conf,           // {user_ids, problem_numbers, start_sbt, end_sbt}
    last_subs = [],       // last submissions
    show_n_subs = uhunt_util.parseInt(localStorage['uva-vcontest-show_n_subs']); // # of live submission
    
  function update_status(){
    var status = '';
    if (conf.end_sbt < 1e50){
      var c = uhunt_util.now();
      if (conf.start_sbt > c){
        var t = uhunt.tpl.format_time_v(conf.start_sbt - c, 1);
        if (t===false) status = 'Contest start date: ' + uhunt.tpl.format_date(conf.start_sbt);
        else status = 'Will start in: ' + t;
      }
      else if (conf.end_sbt < c) status = 'Contest has ended';
      else {
        var t = uhunt.tpl.format_time_v(conf.end_sbt - c, 1);
        if (t===false) status = 'Contest end date: ' + uhunt.tpl.format_date(conf.end_sbt);
        else status = 'Time remaining: <font color=yellow>' + t + '</font>';
      }
    }
    $('#contest_status').html(status);
    setTimeout(update_status, 1000);
  }
  
  function parse_subs(arr){
    var render = false;
    for (var i=0; i<arr.length; i++) if (arr[i].type == 'lastsubs'){
      var a = arr[i], s = a.msg, update = false;
      if (!vcontest.relevant_sub(s.uid, s.pid, s.sbt)) continue;
      s.problem = authors.pid2prob(s.pid);
      render = s.is_new = true;
      for (var j=last_subs.length-1; j>=0; j--)
        if (last_subs[j].sid == s.sid){ last_subs[j] = s; update = true; }

      if (s.ver){
        if (!author_ranklist[s.uid]) author_ranklist[s.uid] = { name : s.name, uname : s.uname, subs : [] };
        author_ranklist[s.uid].subs.push([s.sid, s.pid, s.ver, s.run, s.sbt, s.lan, s.rank]);
      }

      if (update) continue;
      last_subs.push(s);

//      while (last_subs.length > 100) last_subs.shift();
    }
    return render;
  }

  function parse_livesubs(arr, out_of_sync){
    if (out_of_sync) return refresh_last_subs(monitor);
    if (parse_subs(arr)){
      render_ranklist();
      render_livesubs();
    }
    monitor();  
  }

  var shadow_i = 0, shadow_sbt_offset = 0;
  function run_shadows(){
    if (!conf.contest) return;
    var subs = conf.contest.subs, arr = [], cur = now();
    while (shadow_i < subs.length){
      var s = subs[shadow_i];
      if (s.sbt > cur) break;
      arr.push({type:'lastsubs', msg:s});
      shadow_i++;
    }
    if (arr.length > 0 && parse_subs(arr)){
      render_ranklist();
      render_livesubs();
    }
    setTimeout(run_shadows, 1000);
  }
  
  function populate_last_subs(arr){
    last_subs = [];
    for (var uid in arr) if (arr.hasOwnProperty(uid)){
      var a = arr[uid];
      for (var i=0; i<a.subs.length; i++){
        var s = { uid:uid, name: a.name, uname: a.uname,
          sid:uhunt_util.parseInt(a.subs[i][0]),
          pid:uhunt_util.parseInt(a.subs[i][1]),
          ver:uhunt_util.parseInt(a.subs[i][2]),
          run:uhunt_util.parseInt(a.subs[i][3]),
          sbt:uhunt_util.parseInt(a.subs[i][4]),
          lan:uhunt_util.parseInt(a.subs[i][5]),
          rank:uhunt_util.parseInt(a.subs[i][6]),
        };
        //if (!vcontest.relevant_sub(s.uid, s.pid, s.sbt)) continue;
        s.problem = authors.pid2prob(s.pid);
        var update = false;
        for (var j=last_subs.length-1; j>=0; j--)
          if (last_subs[j].sid == s.sid){ last_subs[j] = s; update = true; }
        if (update) continue;
        last_subs.push(s);
      }
    }
    last_subs.sort(function(a,b){ return a.sbt - b.sbt; });
//    while (last_subs.length > 100) last_subs.shift();
  }

  var author_ranklist = {};

  function render_ranklist(){
    // $('#'+conf.ranklist_container).html(uhunt.tpl.render('ranklist_table',{
    //   problem_numbers: conf.problem_numbers,
    //   author_scores: authors.prepare(author_ranklist, conf.problem_numbers, conf.start_sbt),
    //   include_past_subs: conf.include_past_subs,
    //   include_shadows: conf.include_shadows,
    //   has_shadows: conf.contest_id,
    //   user_ids: conf.user_ids
    // }));
  }

  function monitor(){
    // uva.get_livesubs(parse_livesubs);
  }

  function refresh_last_subs(cb){
    console.log('Refresh Last Subs');
    // fetch all user submissions on particular problem
    uhunt.rpc.subs_nums(conf.user_ids, conf.problem_numbers, function(arr){
      if (conf.include_shadows && conf.contest){ // add from the contest subs
        var subs = conf.contest.subs, cur = now();
        for (var i=0; i<subs.length; i++){
          var s = subs[i];
          if (s.sbt > cur) break;
          if (!arr[s.uid]) arr[s.uid] = { name : s.name, uname : s.uname, subs : [] };
          arr[s.uid].subs.push([s.sid, s.pid, s.ver, s.run, s.sbt, s.lan, s.rank]);
        }
      }
      populate_last_subs(arr);
      author_ranklist = arr;
      render_ranklist();
      render_livesubs();
      cb();
    });
  }

  return {
    start: function(c){
      if (!c) alert('Virtual contest configuration needed!'); else conf = c;
      if (c.contest_id && !c.contest){
        uva.get_contest_detail(c.contest_id,function(cd){
          c.problem_numbers = cd.problems;
          c.contest = cd;
          $('#contest_title').html(cd.name);
          cd.subs.sort(function(a,b){ return a[4] - b[4]; }); // sort by submittime
          if (conf.start_sbt){
            conf.include_shadows = true;
            conf.end_sbt = conf.start_sbt + cd.endtime - cd.starttime;
          } else {
            alert('Please specify the start time of the shadow contest');
          }

          // adjust the submittime of the shadow
          var diff = c.start_sbt - cd.starttime;
          if (diff < 0) alert('Error start time of the shadow contest');
          for (var i=0; i<cd.subs.length; i++) cd.subs[i][4] += diff;

          vcontest.start(c);
        });
        return;
      }

      if (!conf.start_sbt) conf.start_sbt = 861120280;  // first UVa submission
      
      if (!conf.end_sbt || conf.end_sbt <= conf.start_sbt)
        conf.end_sbt = 1e100;             // infinite, never end

      for (var i=0; i<conf.user_ids.length; i++)
        authors.add_uid(conf.user_ids[i]);

      authors.resolve_pnums(conf.problem_numbers, function(){
        if (conf.contest){
          var subs = conf.contest.subs;
          for (var i=0; i<subs.length; i++){
            var s = subs[i];
            subs[i] = {
              sid : i+1,
              pid : authors.num2pid(s[0]),
              ver : s[1],
              run : s[2],
              mem : 0,
              uid : 's' + s[3],
              sbt : s[4],
              lan : s[5],
              name : s[6],
              uname : s[7],
              rank : -1,
            };
            authors.add_uid(subs[i].uid);
          }
        }
        $(function(){     // execute when DOM is ready
          run_shadows();
          render_ranklist();
          refresh_last_subs(monitor);
          update_status();
        });
      });
    },

    relevant_sub : function (uid,pid,sbt){
      if (!conf.include_past_subs && uhunt_util.parseInt(sbt) < conf.start_sbt) return false;
      if (uhunt_util.parseInt(sbt) > conf.end_sbt) return false;
      return authors.is_valid(uid,pid);
    },

    set_show_n_subs: function(n){
      show_n_subs = localStorage['uva-vcontest-show_n_subs'] = n;
      render_livesubs();
    },

    toggle_include_past_subs: function(){
      var a = $('#include_past_subs_chk');
      conf.include_past_subs = a.is(':checked');
      render_ranklist();
      render_livesubs();
    },
    
    toggle_shadows: function(){
      var a = $('#include_shadow_chk');
      conf.include_shadows = a.is(':checked');
      render_ranklist();
      render_livesubs();
    },
    
    toggle_livesubs: function(){
      $('#show_livesubs_a').toggle();
      var t = $('#'+conf.livesubs_container);
      if (t.is(":hidden")){
        localStorage['show_livesubs'] = '1';
        t.slideDown('fast');
      } else {
        localStorage['show_livesubs'] = 0;
        t.slideUp('fast');
      }
    },
  };
})();

var authors = (function(){
  var valid_uid = {}, num2prob = {}, pid_map = {};

  return {
    add_uid : function(uid){ valid_uid[uid] = true; },

    is_valid : function(uid,pid){
      if (!valid_uid[uid]) return false;
      if (!pid_map[pid]) return false;
      return true;
    },
    
    resolve_pnums : function(nums,cb){
      var cnt = nums.length;
      $.each(nums,function(i,num){
        uhunt.rpc.problem_by_num(num, function(p){    // fetch problem details
          num2prob[p.num] = pid_map[p.pid] = p;
          if (--cnt == 0) cb();
        });
      });
    },

    num2pid : function(num){ return num2prob[num].pid; },
    pid2prob : function(pid){ return pid_map[pid]; },

    prepare : function (arr, problem_numbers, start_sbt){
      var author_scores = [];
      for (var uid in arr) if (arr.hasOwnProperty(uid)){
        var a = arr[uid];
        a.uid = uid;
        a.subs.sort(function sid_cmp(a,b){ return a[0] - b[0]; });
        a.solved = a.penalty = 0;
        var p = {}; // [[0:sid, 1:pid, 2:ver, 3:run, 4:sbt, 5:lan, 6:rank]]
        for (var i=0; i<a.subs.length; i++){
          var s = a.subs[i], pid = intval(s[1]);
          if (!vcontest.relevant_sub(a.uid, pid, intval(s[4]))) continue;
          if (!p[pid]) p[pid] = { nos:0, ac:0 };
          if (p[pid].ac) continue;
          if (s[2]==90){
            p[pid].ac = 1;
            p[pid].sbt = intval(s[4]) - start_sbt;
            a.solved++;
            a.penalty += p[pid].sbt + p[pid].nos * 20 * 60;
          } else {
            p[pid].nos++;
          }
        }
        a.problems = [];
        for (var j=0; j<problem_numbers.length; j++){
          var pid = num2prob[problem_numbers[j]].pid;
          a.problems.push(p[pid]);
        }
        author_scores.push(a);
      }
      author_scores.sort(function solved_pen_cmp(a,b){
        return (a.solved != b.solved)? (b.solved - a.solved) : (a.penalty - b.penalty);
      });
      return author_scores;
    }
  };
})();


uhunt.init = function () {
  $('#uhunt_widget_chat').html(uhunt.chat.render({
    width: $('#uhunt_widget_chat').width(),
    height: $('#uhunt_widget_chat').height(),
    uname_width: 140,
    font_family: "verdana",
    font_size: 11,
    post_field_height: 18,
    background_color: "#eee",
    border_color: "#aaa"}));
};

// uhunt.tpl.format_time_v = function(w,back) {
//   if (back<=5 && w < 60) { return Math.ceil(w) + ' seconds'; }
//   if (back<=4 && w < 60*60) { return Math.floor(w/60) + ' minutes'; }
//   if (back<=3 && w < 24*60*60) { return Math.floor(w/60/60) + ' hours ' + (Math.floor(w/60)%60) + ' minutes'; }
//   if (back<=2 && w < 30*24*60*60) { return Math.floor(w/60/60/24) + ' days'; }
//   if (back<=1 && w < 365*24*60*60) { return Math.floor(w/60/60/24/30) + ' months'; }
//   return false;
// };


//     if (uhunt.algorithmist.exists(p.num)) pwidth -= 20;
// + (p?('<span style="float:right">'+uhunt.tpl.discuss_link(p.num)+'&nbsp;</span> &nbsp;' + 
//                 uhunt.tpl.problem_title(p.pid,p.tit,pwidth)):'- ? -') + 

*/
