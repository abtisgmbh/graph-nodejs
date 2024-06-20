#Requires -Modules @{ ModuleName='Microsoft.Graph.Authentication'; ModuleVersion='2.17.0' }
#Requires -Modules @{ ModuleName='Microsoft.Graph.Applications'; ModuleVersion='2.17.0' }

function Add-ManagedIdentityPermissions {

    [CmdletBinding()]
    param (
        # The id of the tenant where the managed identity is registered
        [Parameter(Mandatory)]
        [string]
        $TenantId,

        # The id of the managed identity that was activated on the resource
        [Parameter(Mandatory)]
        [string]
        $ManagedIdentityId,

        # Application Permissions that will be set on the managed identity.
        [Parameter()]
        [string[]]
        $ApplicationPermissions = @(
            'User.Read.All'
        )
    )

    # Get the necessary delegated permission to add the permissions.
    Connect-MgGraph -Scopes "Application.Read.All",
    "AppRoleAssignment.ReadWrite.All",
    "RoleManagement.ReadWrite.Directory" `
        -TenantId $tenantId `
        -NoWelcome

    $graphApp = Get-MgServicePrincipal -Filter "AppId eq '00000003-0000-0000-c000-000000000000'"
    foreach ($scope in $ApplicationPermissions) {
        $appRole = $graphApp.AppRoles | Where-Object { $_.Value -eq $scope }
        
        try {
            New-MgServicePrincipalAppRoleAssignment `
                -PrincipalId $ManagedIdentityId `
                -ServicePrincipalId $ManagedIdentityId `
                -ResourceId $graphApp.Id `
                -AppRoleId $appRole.Id `
                -ErrorAction Stop
        } catch {
            if ($_ -match 'Permission being assigned already exists on the object') {
                Write-Warning "Permission $scope already set for $ManagedIdentityId"
            } else {
                throw $_
            }
        }
    }
}