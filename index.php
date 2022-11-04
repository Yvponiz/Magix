<?php
    require_once("action/IndexAction.php");

    $action = new IndexAction();
    $data = $action->execute();

    require_once("partial/header.php");

?>
    <div class="wrapper-index">
        <div class="title">
            Metal Gear Magix
        </div>

        <div class="index-row-flex">
            <div class="index-column-flex">
                <div class="login-form">

                    <h1 class="connexion">Login</h1>
                    <form action="index.php" method="post">
                        <?php
                            if(!empty($data["erreurLogin"])){
                                ?>
                                    <div class="error-div"><?= $data["erreurLogin"] ?></div>
                                <?php
                            }
                        ?>

                        <p class="form-label">
                            <label for="username">Username  </label>
                        </p>
                        <input type="text" name="username" id="username" class="form-input" />
                        
                        <p class="form-label">
                            <label for="password">Mot de passe </label>
                        </p>
                        <input type="password" name="password" id="password" class="form-input"/>

                        <div class="form-button">
                            <button type="submit">Connexion</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</body>