<!DOCTYPE html>
<html>

<head>
    <title>Edit Event</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="static/style.css" />
</head>

<body>
    <div id="modal" class="modal">
        <div class="modalMessage">
            <p id="modalText"></p>
            <button onclick="ok()">Ok</button>
        </div>
    </div>
    <div class="main">
        <h1>Edit Event</h1>
        <table>
            <tr>
                <td class="tdleft">Name:</td>
                <td class="tdright"><input type="text" id="name" size="25"></td>
            </tr>

            <tr class="rowspace"></tr>

            <tr>
                <td class="tdleft">Picture:</td>
                <!-- <td class="tdright"><input type="file" id="pic" style="width:300px"><span class="info" onclick="picInfo()">&#9432;</span></td> -->
                <td>
                    <div class="pictureEdit">
                        <div class="picInp">
                            <input type="file" id="pic" >
                        </div>
                        <div class="picError">
                            <span class="info" onclick="picInfo()">&#9432;</span>
                        </div>
                    </div>
                </td>
            </tr>

            <tr class="rowspace"></tr>

            <tr>
                <td class="tdleft">Address:</td>
                <td class="tdright"><input type="text" id="address" size="25"></td>
            </tr>
            <tr>
                <td class="tdleft">City:</td>
                <td class="tdright"><input type="text" id="city" size="25"></td>
            </tr>
            <tr>
                <td class="tdleft">State:</td>
                <td class="tdright">
                    <select id="stateSelect">
                        <option>--Select A State--</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td class="tdleft">Zip Code:</td>
                <!-- <td style="width: 300px;"> -->
                <td>
                    <div class="zip">
                        <div class="zipInp">
                            <input oninput="zip()" type="text" id="zipInput" size="10">
                        </div>
                        <div class="zipError">
                            <span id="zipSpan"></span>
                        </div>
                    </div>
                </td>
            </tr>

            <tr class="rowspace"></tr>

            <tr>
                <td class="tdleft">Start Time:</td>
                <td class="tdright"><input type="datetime-local" id="start"></td>
            </tr>
            <tr>
                <td class="tdleft">End Time:</td>
                <td class="tdright"><input type="datetime-local" id="end"></td>
            </tr>

            <tr class="rowspace"></tr>
            <tr>
                <td class="tdleft">Description:</td>
                <td class="tdright"><textarea id="description" rows="4" cols="25"></textarea></td>
            </tr>
        </table>
        <!-- Description: <br><textarea id="description" rows="4" cols="30"></textarea> -->
        <br><br>
        <button onclick="add();">Add</button>
    </div>
    <!-- <div style="width: 100px; height: 100px; background-color: green;"></div> -->


    <script type="text/javascript" src="static/EditEvent.js"></script>
</body>


</html>