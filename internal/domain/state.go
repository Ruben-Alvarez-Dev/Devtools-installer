package domain

import "fmt"

// InstallStatus represents the current state of a tool installation
type InstallStatus string

const (
	StatusNotInstalled InstallStatus = "not_installed"
	StatusInstalled    InstallStatus = "installed"
	StatusInstalling   InstallStatus = "installing"
	StatusUpdating     InstallStatus = "updating"
	StatusUninstalling InstallStatus = "uninstalling"
	StatusError        InstallStatus = "error"
)

// ToolState represents the current state of a tool on the system
type ToolState struct {
	ToolID           string           `json:"toolId"`
	Status           InstallStatus    `json:"status"`
	InstalledVersion *InstalledVersion `json:"installedVersion,omitempty"`
	UpdateAvailable  bool             `json:"updateAvailable"`
	LatestVersion    string           `json:"latestVersion,omitempty"`
	LastError        string           `json:"lastError,omitempty"`
	LastChecked      string           `json:"lastChecked,omitempty"`
}

// InstallStage represents the current stage of installation
type InstallStage string

const (
	StagePreparing   InstallStage = "preparing"
	StageDownloading InstallStage = "downloading"
	StageExtracting  InstallStage = "extracting"
	StageConfiguring InstallStage = "configuring"
	StageInstalling  InstallStage = "installing"
	StageComplete    InstallStage = "complete"
	StageFailed      InstallStage = "failed"
)

// InstallProgress represents the progress of an ongoing installation
type InstallProgress struct {
	ToolID       string       `json:"toolId"`
	Stage        InstallStage `json:"stage"`
	Progress     int          `json:"progress"` // 0-100
	Message      string       `json:"message,omitempty"`
	BytesTotal   int64        `json:"bytesTotal,omitempty"`
	BytesCurrent int64        `json:"bytesCurrent,omitempty"`
	Error        string       `json:"error,omitempty"`
	Timestamp    string       `json:"timestamp,omitempty"`
}

// CanCancel returns true if the installation can be cancelled
func (p *InstallProgress) CanCancel() bool {
	return p.Stage != StageComplete && p.Stage != StageFailed
}

// PercentComplete returns the progress as a percentage string
func (p *InstallProgress) PercentComplete() string {
	if p.BytesTotal > 0 {
		percent := float64(p.BytesCurrent) / float64(p.BytesTotal) * 100
		if percent > 100 {
			percent = 100
		}
		return fmt.Sprintf("%.1f%%", percent)
	}
	return fmt.Sprintf("%d%%", p.Progress)
}
