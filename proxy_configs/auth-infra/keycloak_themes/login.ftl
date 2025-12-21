<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Login Page</title>
  
  <link rel="stylesheet" href="${url.resourcesPath}/css/login.css">
</head>
<body>
  <main>
    <div class="login-card">
      
      <div class="login-header">
        <div class="avatar">
          <svg viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
        </div>
        <h1>Welcome Back!</h1>
        <p>Sign in to continue</p>
      </div>

      <div class="login-body">
        
        <#if message?has_content && (message.type != 'warning' || !isAppInitiatedAction??)>
            <div class="alert alert-${message.type}" style="color: red; text-align: center; margin-bottom: 15px;">
                ${kcSanitize(message.summary)?no_esc}
            </div>
        </#if>

        <form id="kc-form-login" class="form-container" onsubmit="login.disabled = true; return true;" action="${url.loginAction}" method="post">
          
          <div class="form-group">
            <label for="username">Username</label>
            <div class="input-wrapper">
              <span class="input-icon">
                <svg viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </span>
              <input 
                id="username" 
                name="username" 
                value="${(login.username!'')}" 
                type="text" 
                required 
                class="form-input"
                placeholder="Enter your username"
                autocomplete="off"
              />
            </div>
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <div class="input-wrapper">
              <span class="input-icon">
                <svg viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </span>
              <input 
                id="password" 
                name="password" 
                type="password" 
                required 
                class="form-input"
                placeholder="Enter your password"
                autocomplete="off"
              />
            </div>
          </div>

          <div class="form-options">
            <#if realm.rememberMe && !login.rememberMe??>
                <label class="remember-me">
                  <input id="rememberMe" name="rememberMe" type="checkbox">
                  <span>Remember me</span>
                </label>
            </#if>
            <#if realm.rememberMe && login.rememberMe??>
                <label class="remember-me">
                  <input id="rememberMe" name="rememberMe" type="checkbox" checked>
                  <span>Remember me</span>
                </label>
            </#if>

            <#if realm.resetPasswordAllowed>
                <a href="${url.loginResetCredentialsUrl}" class="forgot-password">Forgot password?</a>
            </#if>
          </div>

          <button type="submit" name="login" id="kc-login" class="submit-btn">
            Sign In
          </button>
        </form>

        <p id="loginMsg"></p>

        <div class="signup-section">
          <p>
            Don't have an account? 
            <#if realm.password && realm.registrationAllowed && !registrationDisabled??>
                <a href="${url.registrationUrl}" class="signup-link">Sign up here</a>
            </#if>
          </p>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>© MP Project</p>
    </div>
  </main>
</body>
</html>
